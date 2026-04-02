interface CharacterCountProps {
  count: number;
}

export default function CharacterCount({ count }: CharacterCountProps) {
  if (count === 0) return null;

  let color = 'text-gray-400 dark:text-gray-500';
  let warning = '';

  if (count > 2000) {
    color = 'text-red-500';
    warning = 'Most AI generators will truncate';
  } else if (count > 1000) {
    color = 'text-yellow-500';
    warning = 'May exceed DALL-E limit';
  } else if (count > 500) {
    color = 'text-yellow-400';
    warning = 'May exceed Midjourney limit';
  }

  return (
    <div className={`text-xs ${color} flex items-center justify-between mt-2 px-1`}>
      <span>{count} characters</span>
      {warning && <span className="font-medium">⚠️ {warning}</span>}
    </div>
  );
}
