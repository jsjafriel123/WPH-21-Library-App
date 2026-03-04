export default function Checkout() {
  return (
    <section className="mt-[80px] flex max-h-[1153px] w-[361px] flex-col gap-6 lg:mt-[128px] lg:h-[716px] lg:w-[1002px] lg:gap-8">
      <p className="flex w-full text-display-xs font-bold text-neutral-950 lg:text-display-lg">
        Checkout
      </p>
      <div className="flex max-h-[1101px] w-full flex-col gap-4 lg:h-[640px] lg:flex-row lg:gap-[58px]">
        {/* User info & Book list */}
        <div className="flex max-h-[454px] w-full flex-col gap-4">
          <div className="flex h-[146px] w-full flex-col gap-2">
            <p className="text-lg font-bold tracking-[-3%] text-neutral-950">
              User Information
            </p>
            <div className="flex h-[30px] justify-between text-sm text-neutral-950">
              <span className="font-medium tracking-[-3%]">Name</span>{" "}
              <span className="font-bold tracking-[-2%]">name</span>
            </div>
            <div className="flex h-[30px] justify-between text-sm text-neutral-950">
              <span className="font-medium tracking-[-3%]">Email</span>{" "}
              <span className="font-bold tracking-[-2%]">email</span>
            </div>
            <div className="flex h-[30px] justify-between text-sm text-neutral-950">
              <span className="font-medium tracking-[-3%]">
                Nomor Handphone
              </span>{" "}
              <span className="font-bold tracking-[-2%]">phone</span>
            </div>
          </div>
          <div className="h-px w-full border bg-neutral-300" />
          <div className="flex max-h-[276px] w-full flex-col gap-4">
            <p className="text-lg font-bold tracking-[-3%] text-neutral-950">
              Book List
            </p>
            <div className="flex max-h-[228px] w-full flex-col overflow-y-auto">
              <p>LIST OF BOOKS HERE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
