
import React from "react";

const Card = ({ image, title, price, }) => (
    <div className=" rounded-lg  items-center  flex  flex-col gap-4 w-full ">
        <div className="w-[250px]  rounded-full">
            <img src={image} alt={title} className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 " />
        </div>
        <div className="w-full  items-center p-4">
            <p className="text-gray-600  font-regular ">{title}</p>
            <p className="text-xl font-semibold ">${price}</p>

        </div>

    </div>
);

export default Card;

