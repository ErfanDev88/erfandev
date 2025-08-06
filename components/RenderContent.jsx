import Image from "next/image";

function RenderContent({ content }) {
  if (!content) return null;

  return (
    <div className="w-full flex flex-col items-start mt-0 md:mt-20 relative">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg font-extralight mt-5 leading-loose text-center md:text-start text-[#cfcfcf]"
                data-aos="zoom-in"
              >
                {block.children?.map((child, i) => {
                  if (child.bold)
                    return (
                      <strong data-aos="zoom-in" key={i} className="font-bold text-white">
                        {child.text}
                      </strong>
                    );
                  if (child.italic)
                    return <em data-aos="zoom-in" key={i}>{child.text}</em>;
                  return child.text;
                })}
              </p>
            );

          case "heading": {
            const Tag = `h${block.level || 3}`;
            let className = "w-full text-center leading-relaxed md:leading-normal md:text-start font-black mt-10";

            if (block.level === 3) {
              className += " text-3xl text-white"; // h3 سفید
            } else if (block.level === 6) {
              className += " text-xl text-[#e9d06c]"; // h6 زرد
            } else {
              className += " text-xl text-white"; // سایر هدینگ‌ها
            }

            return (
              <Tag key={index} className={className} data-aos="zoom-in">
                {block.children?.map((child, i) => child.text).join("")}
              </Tag>
            );
          }

          case "image":
            return (
              <div key={index} className="flex justify-center w-full">
                <img
                  src={block.image?.url}
                  alt={block.image?.alternativeText || ""}
                  className="rounded-xl md:mt-5 mt-0"
                  data-aos="zoom-in"
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default RenderContent;
