import React from "react";
import { Modal, ConfigProvider, theme } from "antd";
import { motion } from "framer-motion";
import { BsXCircle } from "react-icons/bs";

const ErrorModal = ({ openErrorModal, setOpenErrorModal, message }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#08807a",
          colorBgContainer: "#181818",
          colorBgElevated: "#181818",
          colorBgLayout: "#181818",
          colorBgSpotlight: "#181818",
          colorBgFloating: "#181818",
          colorBgSecondary: "#181818",
          colorBgSecondaryHover: "#181818",
          colorBgSecondaryActive: "#181818",
          colorBorder: "#2d2d2d",
          colorBorderSecondary: "#2d2d2d",
          colorBorderTertiary: "#2d2d2d",
          colorBorderQuaternary: "#2d2d2d",
          colorBorderHover: "#2d2d2d",
          colorBorderActive: "#2d2d2d",
          colorBorderSelected: "#2d2d2d",
          colorBorderSelectedHover: "#2d2d2d",
          colorBorderSelectedActive: "#2d2d2d",
          colorBorderDisabled: "#2d2d2d",
          colorBorderDisabledHover: "#2d2d2d",
          colorBorderDisabledActive: "#2d2d2d",
          colorText: "#ffffff",
          colorTextSecondary: "#ffffff",
          colorTextTertiary: "#ffffff",
          colorTextQuaternary: "#ffffff",
          colorTextPlaceholder: "#ffffff",
          colorTextDisabled: "#ffffff",
          colorTextHeading: "#ffffff",
          colorTextTitle: "#ffffff",
          colorTextDescription: "#ffffff",
          colorTextLightSolid: "#ffffff",
          colorTextLight: "#ffffff",
          colorTextMuted: "#ffffff",
          colorTextLighter: "#ffffff",
        },
      }}
    >
      <Modal
        open={openErrorModal}
        onCancel={() => setOpenErrorModal(false)}
        footer={false}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-3 my-6 mt-9">
            <BsXCircle className="text-5xl text-red-500" />
            <h2 className="text-xl text-neutral-300 font-bold">{message}</h2>
          </div>
        </motion.div>
      </Modal>
    </ConfigProvider>
  );
};

export default ErrorModal;
