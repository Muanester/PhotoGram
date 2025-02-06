import * as React from "react";
import Image2 from "@/assets/images/image2.jpg";
import Image3 from "@/assets/images/image3.jpg";
import Image5 from "@/assets/images/image5.jpg";
import Image6 from "@/assets/images/image6.jpg";
import Image7 from "@/assets/images/image7.jpg";

interface IStoriesProps {}

const Stories: React.FunctionComponent<IStoriesProps> = (props) => {
  return (
    <div className="flex justify-between">
      <img
        src={Image2}
        alt=""
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={Image3}
        alt=""
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={Image5}
        alt=""
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={Image6}
        alt=""
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={Image7}
        alt=""
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={Image3}
        alt=""
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={Image2}
        alt=""
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
    </div>
  );
};

export default Stories;
