import Image from "next/image";

export function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Check back soon.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-[#101828] min-h-[600px]">
      <Image
        src="/assets/icons/hour-glass.svg"
        alt=""
        height={120}
        width={120}
      />
      <p className="mt-4 font-semibold text-lg">{title}</p>
      <p className="mt-[10px] max-w-[320px] text-[13px] text-[#5F5F5F]">
        {description}
      </p>
    </div>
  );
}
