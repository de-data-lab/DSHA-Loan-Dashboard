import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";

type Props = {
  buttonContent: React.ReactNode;
  children: React.ReactNode;
};

export default function Dialog({ buttonContent, children }: Props) {
  return (
    <BaseDialog.Root>
      <BaseDialog.Trigger
        className="flex h-9 items-center
        justify-center rounded-md border border-gray-200 bg-gray-50
        px-3.5 text-[15px] font-medium text-gray-900
        select-none hover:bg-gray-100 focus-visible:outline
        focus-visible:outline-2 focus-visible:-outline-offset-1
        focus-visible:outline-blue-800 active:bg-gray-100"
      >
        {buttonContent}
      </BaseDialog.Trigger>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className="fixed inset-0 bg-black
          opacity-30 transition-all duration-150
          data-[ending-style]:opacity-0 data-[starting-style]:opacity-0
          dark:opacity-70 z-[20]"
        />
        <BaseDialog.Popup
          className="fixed top-1/2 left-1/2
            -mt-8 max-w-[min(98vw,600px)] -translate-x-1/2
            -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900
            outline outline-1 outline-gray-200 transition-all
            duration-150 data-[ending-style]:scale-90
            data-[ending-style]:opacity-0
            data-[starting-style]:scale-90
            data-[starting-style]:opacity-0
            dark:outline-gray-300 z-[30]"
        >
          {children}
          <div className="flex gap-4 mt-4">
            <BaseDialog.Close
              className="flex h-10 items-center
                justify-center rounded-md border
                border-gray-200 bg-gray-50 px-3.5
                text-base font-medium text-gray-900 select-none
                hover:bg-gray-100 focus-visible:outline
                focus-visible:outline-2 focus-visible:-outline-offset-1
                focus-visible:outline-blue-800 active:bg-gray-100"
            >
              Close
            </BaseDialog.Close>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}