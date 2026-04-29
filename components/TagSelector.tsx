import { Chip, Stack } from '@mui/material';

export interface ContentfulTag {
  sys: { id: string };
  name: string;
}

interface TagSelectorProps {
  tags: ContentfulTag[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
  allLabel: string;
}

export default function TagSelector({ tags, selectedTag, onSelect, allLabel }: TagSelectorProps) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
      <Chip
        label={allLabel}
        onClick={() => onSelect(null)}
        color={selectedTag === null ? 'primary' : 'default'}
        variant={selectedTag === null ? 'filled' : 'outlined'}
      />
      {tags.map((tag) => (
        <Chip
          key={tag.sys.id}
          label={tag.name}
          onClick={() => onSelect(tag.sys.id)}
          color={selectedTag === tag.sys.id ? 'primary' : 'default'}
          variant={selectedTag === tag.sys.id ? 'filled' : 'outlined'}
        />
      ))}
    </Stack>
  );
}
