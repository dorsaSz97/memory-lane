import Spinner from '../../components/ui/Spinner';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="w-full m-auto h-full flex justify-center items-center">
      <Spinner />
    </div>
  );
}
