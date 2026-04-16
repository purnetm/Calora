import React from "react";
import svgPaths from "../../imports/svg-ecdjpw5ij2";

// Imported assets from Figma
import imgCheesecake from "figma:asset/ab9f21612d7a46fdfefa46d9ab4fe9080ce25033.png";
import imgMacarons from "figma:asset/8e16a308b8dc42ec487ab11abcdd1eb65d9e0996.png";
import imgIceCream from "figma:asset/9bae713b55ab69625164ff4da1b7a40b175810e9.png";
import imgBrownie from "figma:asset/58d8e711e49b98f5cad5aaa7302ab8749466b245.png";

const TOP_STYLES = [
  { left: "7.08px", top: "39.53px", rotate: "-60.01deg" },
  { left: "13.3px", top: "25.63px", rotate: "-48.9deg" },
  { left: "26.74px", top: "11.18px", rotate: "-32.97deg" },
  { left: "46.42px", top: "7.04px", rotate: "-19.63deg" },
  { left: "58.29px", top: "3.43px", rotate: "-8.89deg" },
  { left: "73.63px", top: "3.15px", rotate: "3.7deg" },
  { left: "85.74px", top: "5.03px", rotate: "14.08deg" },
  { left: "92.94px", top: "8.26px", rotate: "25.19deg" },
  { left: "104.98px", top: "16.96px", rotate: "37.42deg" },
  { left: "112.68px", top: "25.7px", rotate: "46.68deg" },
  { left: "117.79px", top: "34.45px", rotate: "57.42deg" },
];

function PrimaryButton({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#9575cd] px-[56px] py-[24px] rounded-[360px] text-white hover:bg-[#7e57c2] transition-colors cursor-pointer shadow-lg hover:shadow-xl active:scale-95 duration-200"
    >
      <span className="font-['Lato'] font-medium text-[22px] leading-[18px]">Get started</span>
    </button>
  );
}

export default function DonutLanding({ onOpenModal }: { onOpenModal?: () => void }) {
  return (
    <div className="bg-[#fafafa] w-full max-w-full rounded-[16px] overflow-hidden p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start justify-center">
      {/* Left Content */}
      <div className="flex flex-col gap-8 w-full lg:max-w-[500px]">
        <div className="flex flex-col">
          <h1 className="font-['Lato'] font-semibold text-[#212121] text-[48px] md:text-[64px] leading-tight">
            Ready?<br />Snack time!
          </h1>
        </div>
        
        <p className="font-['Lato'] text-[#757575] text-[20px] md:text-[24px] leading-[32px]">
          Experience the melt-in-your-mouth joy of gourmet treats, reimagined with plant-based ingredients and zero artificial preservatives. Finally, a treat that loves you back.
        </p>
        
        <div className="pt-2">
          <PrimaryButton onClick={onOpenModal} />
        </div>

        {/* Badges - 3 circles with responsive sizing */}
        <div className="flex gap-3 md:gap-6 justify-start mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { color: "#C8E6C9", icon: svgPaths.p739a400, text: "Low Calorie" },
            { color: "#FFCC80", icon: svgPaths.p3c03df00, text: "Plant Based" },
            { color: "#FFCDD2", icon: svgPaths.p9628000, text: "Gluten Free", size: 24 },
          ].map((badge, i) => (
            <div key={i} className="relative w-24 h-24 md:w-[148px] md:h-[148px] shrink-0 transition-transform hover:scale-105 duration-300">
              <svg className="block size-full" viewBox="0 0 148 148">
                <defs>
                  <path id={`curve-top-${i}`} d="M 16,74 A 58,58 0 1,1 132,74" />
                  <path id={`curve-bottom-${i}`} d="M 132,74 A 58,58 0 1,1 16,74" />
                </defs>
                <circle cx="74" cy="74" r="73.6" fill={badge.color} stroke="#212121" strokeWidth="0.8" />
                <text className="font-['Lato'] font-medium text-[19px] fill-[#212121]" letterSpacing="0.1em">
                  <textPath href={`#curve-top-${i}`} startOffset="50%" textAnchor="middle" side="right">
                    {badge.text}
                  </textPath>
                </text>
                <text className="font-['Lato'] font-medium text-[19px] fill-[#212121]" letterSpacing="0.1em">
                  <textPath href={`#curve-bottom-${i}`} startOffset="50%" textAnchor="middle" side="right">
                    {badge.text}
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg width={badge.size || 32} height={badge.size || 32} viewBox={`0 0 ${badge.size || 32} ${badge.size || 32}`} fill="none">
                  <path d={badge.icon} fill="#212121" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-[32px] border border-[#212121] p-8 md:px-[40px] md:py-[24px] w-full mt-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="flex flex-col gap-2">
              <h3 className="font-['Lato'] font-medium text-[#212121] text-[22px]">Title</h3>
              <p className="font-['Lato'] font-light text-[#757575] text-[18px] max-w-[180px]">
                Lorem ipsum dolor sit consectetur adipiscing
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-['Lato'] font-medium text-[#212121] text-[22px]">Title</h3>
              <p className="font-['Lato'] font-light text-[#757575] text-[18px] max-w-[180px]">
                Lorem ipsum dolor sit consectetur adipiscing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Images - Responsive Grid */}
      <div className="flex gap-4 sm:gap-6 shrink-0 w-full lg:w-auto justify-center">
        {/* Column 1 */}
        <div className="flex flex-col gap-6 sm:gap-12 w-[45%] sm:w-auto items-end">
          {/* Top Left: Cheesecake */}
          <div className="relative w-full sm:w-[302px] aspect-[302/348] rounded-[24px] sm:rounded-[40px] border border-[#212121] overflow-hidden shadow-md group">
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] overflow-hidden">
               <img src={imgCheesecake} alt="Gourmet Cheesecake Slice" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] border border-[#212121] pointer-events-none"></div>
          </div>
          {/* Bottom Left: Macarons */}
          <div className="relative w-full sm:w-[302px] aspect-[302/348] rounded-[24px] sm:rounded-[40px] border border-[#212121] overflow-hidden shadow-md group">
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] overflow-hidden">
               <img src={imgMacarons} alt="Colorful Macarons" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] border border-[#212121] pointer-events-none"></div>
          </div>
        </div>
        
        {/* Column 2 */}
        <div className="flex flex-col gap-6 sm:gap-12 pt-8 sm:pt-12 md:pt-24 w-[45%] sm:w-auto items-start">
          {/* Top Right: Ice Cream */}
          <div className="relative w-full sm:w-[302px] aspect-[302/348] rounded-[24px] sm:rounded-[40px] border border-[#212121] overflow-hidden shadow-md group">
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] overflow-hidden">
               <img src={imgIceCream} alt="Ice Cream Scoops" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] border border-[#212121] pointer-events-none"></div>
          </div>
          {/* Bottom Right: Brownie */}
          <div className="relative w-full sm:w-[302px] aspect-[302/348] rounded-[24px] sm:rounded-[40px] border border-[#212121] overflow-hidden shadow-md group">
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] overflow-hidden">
               <img src={imgBrownie} alt="Chocolate Brownies" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="absolute inset-0 rounded-[24px] sm:rounded-[40px] border border-[#212121] pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
