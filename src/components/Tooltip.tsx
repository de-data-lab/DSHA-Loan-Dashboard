import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { Info } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function Tooltip({ children }: Props) {
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root delay={100}>
        <BaseTooltip.Trigger
          className="flex size-8 items-center justify-center
          rounded-sm text-gray-900 select-none focus-visible:bg-none
          focus-visible:outline focus-visible:outline-2
          focus-visible:-outline-offset-1 focus-visible:outline-blue-800
          focus-visible:[&:not(:hover)]:bg-transparent"
        >
          <Info color="white" size={18} />
        </BaseTooltip.Trigger>
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side="right"
            sideOffset={10}
            className={"z-10"}
          >
            <BaseTooltip.Popup
              className="flex max-w-[300px] origin-[var(--transform-origin)]
              flex-col rounded-md bg-[canvas] px-2 py-1 text-sm outline
              outline-1 outline-gray-200 transition-[transform,scale,opacity]
              data-[ending-style]:scale-90 data-[ending-style]:opacity-0
              data-[instant]:duration-0 data-[starting-style]:scale-90
              data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1
              dark:outline-gray-300"
            >
              {children}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}