import icons from '../assets/icons';

export default function Loading() {
  return (
    <div className="mt-[calc(50dvh-5rem)] flex animate-[spin_1.7s_linear_infinite] justify-center *:h-12 *:w-12">
      {icons.loading}
    </div>
  );
}
