import React from "react";
import { Modal, ConfigProvider, theme } from "antd";
import { motion } from "motion/react";
import { BsCheck2Circle } from "react-icons/bs";

const SuccessModal = ({
  openSuccessModal,
  setOpenSuccessModal,
  description,
}) => {
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
        open={openSuccessModal}
        onCancel={() => setOpenSuccessModal(false)}
        footer={false}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-3 my-6 mt-9">
            <BsCheck2Circle className="text-5xl text-[#f39136]" />
            <h2 className="text-xl text-neutral-300 font-bold">
              {description}
            </h2>
            {/* <p className="capitalize text-neutral-400">
              GHS {amount} Sent To {selectedEmployeeFirstName}{" "}
              {selectedEmployeeLastName}
            </p>
            <p className="capitalize text-neutral-400">
              {selectedEmployeePhone}
            </p> */}
          </div>
        </motion.div>
      </Modal>
    </ConfigProvider>
  );
};

export default SuccessModal;
