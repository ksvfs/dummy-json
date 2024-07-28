import icons from '../assets/icons';

export default function FetchingError() {
  return (
    <div className="mt-[calc(50dvh-8rem)] flex flex-col items-center gap-4 *:h-20 *:w-20">
      {icons.error}
      Ошибка получения данных
    </div>
  );
}
