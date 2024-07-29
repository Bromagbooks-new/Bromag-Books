const Bill = () => {
  return (
    <div className="rounded-xl w-[24rem] px-2 py-8 flex flex-col justify-between gap-3 bg-white">
      <div className="flex flex-col justify-center items-center">
        <p className="text-xl font-semibold">BROMAG RESTRO</p>
        <p className="text-xs text-gray-500">
          No.17, Vallal paari nagar, Pallikaranai 600100
        </p>
        <p className="text-sm text-gray-500">9150289762</p>
      </div>
      <p className="text-2xl text-center font-semibold">INVOICE</p>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          <div className="text-center px-4 h-8 flex text-xs justify-center items-center rounded-3xl border-2">
            KOT
          </div>
          <div className="text-center px-4 h-8 flex text-xs justify-center items-center rounded-3xl border-2">
            VIEW BILL
          </div>
          <div className="text-center px-4 h-8 flex text-xs justify-center items-center rounded-3xl border-2">
            HOLD ORDER
          </div>
        </div>
        <div className="bg-[#486072] rounded-3xl w-full flex justify-center items-center text-white py-1">
          PRINT BILL
        </div>
      </div>
    </div>
  );
};

export default Bill;
