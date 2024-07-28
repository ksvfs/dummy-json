import icons from '../assets/icons';

export default function NoSearchResults() {
  return (
    <div className="mt-[calc(50dvh-8rem)] flex flex-col items-center gap-4 *:h-20 *:w-20">
      {icons.noSearchResults}
      Ничего не найдено
    </div>
  );
}
