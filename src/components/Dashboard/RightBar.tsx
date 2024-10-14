import { CircleEllipsis, CirclePlay } from "lucide-react";
import Image from "next/image";

const RightBar = () => {
  return (
    <div className="top-1/2 flex-1 space-y-8 text-white">
      <div className="relative rounded-lg bg-dashboard p-6">
        <div className="absolute bottom-5 right-5 z-0 h-24 w-24 opacity-50">
          <Image src="/astronaut.png" alt="" fill object-cover />
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="font-bold">
            How to use the new version of the admin dashboard?
          </h3>
          <small className="">Takes 4 minutes to learn</small>
          <p className="z-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="flex w-24 items-center justify-center gap-2 rounded-lg bg-blue-700 p-1 text-sm font-bold">
            <CirclePlay />
            Watch
          </button>
        </div>
      </div>

      <div className="relative rounded-lg bg-dashboard p-6">
        <div className="flex flex-col gap-4">
          <span className="font-bold">🚀 Coming Soon</span>
          <h3 className="font-bold">
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <small className="">Boost your productivity</small>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="flex w-24 items-center justify-center gap-2 rounded-lg bg-blue-700 p-1 text-sm font-bold">
            <CircleEllipsis />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
