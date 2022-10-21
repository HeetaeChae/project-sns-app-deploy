import { Avatar, Card, Button, Modal } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../../../store/modules/user";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const { Meta } = Card;

const ModalStyle = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoverStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 300px;
  background-color: rgb(235, 237, 240);
  &:hover {
    cursor: pointer;
  }
`;

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggingOut = useSelector((state) => state.user.isLoggingOut);
  const me = useSelector((state) => state.user.me);
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const handleOk = () => {
    setIsLogoutModal(false);
    axios
      .get("http://localhost:7000/api/user/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: LOG_OUT });
        } else {
          console.log(res.data.err);
        }
      });
  };
  const handleCancel = () => {
    setIsLogoutModal(false);
  };

  return (
    <>
      <Card
        style={{
          width: 300,
          marginBottom: 50,
        }}
        cover={
          me.image ? (
            <Image
              alt="profileImage"
              src={`http://localhost:7000/${me.image}`}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          ) : (
            <Link href="/profile">
              <a>
                <CoverStyle>
                  <UserOutlined
                    style={{ fontSize: "100px", marginBottom: "10px" }}
                  />
                </CoverStyle>
              </a>
            </Link>
          )
        }
        actions={[
          <Link href="/profile" key="profile">
            <a>
              <Button>
                <UserOutlined />
                내프로필
              </Button>
            </a>
          </Link>,
          isLoggingOut ? (
            <Button
              type="primary"
              onClick={() => setIsLogoutModal(true)}
              loading
            >
              <LogoutOutlined />
              로그아웃
            </Button>
          ) : (
            <Button type="primary" onClick={() => setIsLogoutModal(true)}>
              <LogoutOutlined />
              로그아웃
            </Button>
          ),
        ]}
      >
        <Meta
          avatar={
            me.image ? (
              <Avatar src={`http://localhost:7000/${me.image}`} />
            ) : (
              <Avatar>{me.nickname[0]}</Avatar>
            )
          }
          title={me.nickname}
          description={me.email}
        />
      </Card>
      <ModalStyle
        open={isLogoutModal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        title="로그아웃"
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            네
          </Button>,
        ]}
      >
        <div style={{ fontSize: "18px", textAlign: "center" }}>
          <span style={{ color: "rgb(64, 169, 255)" }}>{me.nickname}</span>님,
          정말 로그아웃 하시겠습니까?
        </div>
      </ModalStyle>
    </>
  );
};

export default User;