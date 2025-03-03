import { toast as sonnerToast } from 'sonner';

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      type={toast.type}
      description={toast.description}
      button={{
        label: toast.button.label,
        onClick: () => console.log('Button clicked'),
      }}
    />
  ));
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast({ type, description, button, id }: ToastProps) {

  return (
    <div className={`flex rounded-lg ${type == 'success' ? 'bg-green-700' : 'bg-red-700'} shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4`}>
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-gray-900">{type}</p>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
        <button
          className="rounded bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-100"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </button>
      </div>
    </div>
  );
}

export default function Headless() {
  return (
    <button
      className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white"
      onClick={() => {
        toast({
          type: 'success',
          description: 'You have full control of styles and jsx, while still having the animations.',
          button: {
            label: 'Reply',
            onClick: () => sonnerToast.dismiss(),
          },
        });
      }}
    >
      Render toast
    </button>
  );
}

interface ToastProps {
  id: string | number;
  type: 'success' | 'error';
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
}