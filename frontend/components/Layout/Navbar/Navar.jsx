import Link from "next/link";
import { Badge, Tag } from "antd";
import { useSelector } from "react-redux";
import { StarTwoTone } from "@ant-design/icons";
import Image from "next/image";

const Navbar = () => {
  const scrapCount = useSelector((state) => state.scrap);
  console.log(scrapCount);
  return (
    <>
      <Link href="/">
        <a>
          <Image src="/logo.png" alt="logo" width={95} height={70} />
        </a>
      </Link>
      <Link href="/scrap">
        <a>
          <Badge count={scrapCount}>
            <Tag
              color="processing"
              style={{ fontSize: "18px", padding: "5px" }}
            >
              <StarTwoTone /> 스크랩
            </Tag>
          </Badge>
        </a>
      </Link>
    </>
  );
};

export default Navbar;
