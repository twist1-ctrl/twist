/**
 * Pulseem Service
 * Handles integration with Pulseem API for adding/updating clients
 */

import axios from 'axios';

export interface ClientData {
  email: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  cellphone?: string;
  gender?: string;
  birthDate?: string;
  city?: string;
  needOptin?: boolean;
  overwrite?: boolean;
  overwriteOption?: string;
}

export interface PulseemResponse {
  sessionId: string;
  status: 'Success' | 'Error';
  error: string | null;
  clientsUploadSummary: {
    totalValidUploadedRecords: number;
    totalDuplicates: number;
    totalInvalidOrEmptyAddresses: number;
    totalRecords: number;
    invalidOrEmptyEmails: number;
    existingEmails: number;
    duplicateEmails: number;
    invalidOrEmptyCellphones: number;
    existingCellphones: number;
    duplicateCellphones: number;
  };
}

export const addClientToPulseem = async (
  clientData: ClientData
): Promise<PulseemResponse> => {
  try {
    const response = await axios.post<PulseemResponse>(
      '/api/pulseem/add-client',
      clientData
    );

    return response.data;
  } catch (error) {
    console.error('Error adding client to Pulseem:', error);
    throw error;
  }
};
