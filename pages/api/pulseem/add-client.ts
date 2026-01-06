import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ClientData, PulseemResponse } from '../../../services/pulseem';

const PULSEEM_API_URL = process.env.PULSEEM_API_URL || 'https://ui-api.pulseem.com';
const PULSEEM_API_ENDPOINT = `${PULSEEM_API_URL}/api/v1/ClientsApi/AddClients`;
const PULSEEM_API_KEY = process.env.PULSEEM_API_KEY;
const PULSEEM_GROUP_IDS = process.env.PULSEEM_GROUP_IDS
  ? JSON.parse(process.env.PULSEEM_GROUP_IDS)
  : [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PulseemResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientData: ClientData = req.body;

    // Validate required fields (email or cellphone)
    if (!clientData.email && !clientData.cellphone) {
      return res.status(400).json({
        error: 'Either email or cellphone is required',
      });
    }

    if (!PULSEEM_API_KEY) {
      console.error('❌ [API] PULSEEM_API_KEY not configured');
      return res.status(500).json({ error: 'Service not configured' });
    }

    if (PULSEEM_GROUP_IDS.length === 0) {
      console.error('❌ [API] PULSEEM_GROUP_IDS not configured');
      return res.status(500).json({ error: 'Service not configured' });
    }

    // Prepare the request body for Pulseem API
    const pulseemPayload = {
      clientsData: [
        {
          email: clientData.email || '',
          firstName: clientData.firstName || '',
          lastName: clientData.lastName || '',
          telephone: clientData.telephone || '',
          cellphone: clientData.cellphone || '',
          extraField1 : clientData.gender || '',
          birthDate: clientData.birthDate || '',
          city: clientData.city || '',
          needOptin: false, // New users added automatically without opt-in
          overwrite: true, // Update existing users
          overwriteOption: 'OverwriteWithNotEmptyValuesOnly',
          optinType: 'EmailOnly',
        },
      ],
      groupIds: PULSEEM_GROUP_IDS,
    };

    // Log headers being sent
    const headers = {
      APIKEY: PULSEEM_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // Call Pulseem API using axios
    const response = await axios.post<PulseemResponse>(PULSEEM_API_ENDPOINT, pulseemPayload, {
      headers,
    });

    // Check if there's an error message from Pulseem
    if (response.data.error) {
      console.error('❌ [API] Pulseem error:', response.data.error);
      return res.status(200).json({
        status: response.data.status,
        error: response.data.error,
        sessionId: response.data.sessionId,
        clientsUploadSummary: response.data.clientsUploadSummary,
      });
    }

    // Check if any records were actually uploaded
    const { totalValidUploadedRecords } = response.data.clientsUploadSummary;
    if (totalValidUploadedRecords === 0) {
      console.error('❌ [API] No records were uploaded by Pulseem');
      return res.status(200).json({
        status: 'Error',
        error: 'No users were added. Please check your information and try again.',
        sessionId: response.data.sessionId,
        clientsUploadSummary: response.data.clientsUploadSummary,
      });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ [API] Error in add-client API:', error);
    if (error instanceof Error) {
      console.error('❌ [API] Error message:', error.message);
    }

    // Check if it's an axios error with response data containing an error
    let errorMessage = 'Failed to process signup';
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }

    return res.status(500).json({
      error: errorMessage,
    });
  }
}
