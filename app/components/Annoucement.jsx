import { Table, ConfigProvider, theme } from "antd"
import React from "react"
import EntityLength from "../uibits/EntityLength"

const Announcement = () => {
  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      {/* header */}
      <div className="flex items-center justify-between">
        <EntityLength entityName="Annoucements" entityCount={0}/>
        <button className="bg-[#f29235] text-white py-2 px-3 rounded-md text-sm">
          + Add Announcement
        </button>
      </div>

      {/* content */}
      <ConfigProvider
                                                theme={{
                                                  algorithm: theme.darkAlgorithm,
                                                  token: {
                                                    colorPrimary: '#08807a',
                                                    colorBgContainer: '#181818',
                                                    colorBgElevated: '#181818',
                                                    colorBgLayout: '#181818',
                                                    colorBgSpotlight: '#181818',
                                                    colorBgFloating: '#181818',
                                                    colorBgSecondary: '#181818',
                                                    colorBgSecondaryHover: '#181818',
                                                    colorBgSecondaryActive: '#181818',
                                                    colorBorder: '#2d2d2d',
                                                    colorBorderSecondary: '#2d2d2d',
                                                    colorBorderTertiary: '#2d2d2d',
                                                    colorBorderQuaternary: '#2d2d2d',
                                                    colorBorderHover: '#2d2d2d',
                                                    colorBorderActive: '#2d2d2d',
                                                    colorBorderSelected: '#2d2d2d',
                                                    colorBorderSelectedHover: '#2d2d2d',
                                                    colorBorderSelectedActive: '#2d2d2d',
                                                    colorBorderDisabled: '#2d2d2d',
                                                    colorBorderDisabledHover: '#2d2d2d',
                                                    colorBorderDisabledActive: '#2d2d2d',
                                                    colorText: '#ffffff',
                                                    colorTextSecondary: '#ffffff',
                                                    colorTextTertiary: '#ffffff',
                                                    colorTextQuaternary: '#ffffff',
                                                    colorTextPlaceholder: '#ffffff',
                                                    colorTextDisabled: '#ffffff',
                                                    colorTextHeading: '#ffffff',
                                                    colorTextTitle: '#ffffff',
                                                    colorTextDescription: '#ffffff',
                                                    colorTextLightSolid: '#ffffff',
                                                    colorTextLight: '#ffffff',
                                                    colorTextMuted: '#ffffff',
                                                    colorTextLighter: '#ffffff'
                                                  }
                                                }}
                                              >
      <Table className="mt-5" />
    </ConfigProvider>
    </div>
  )
}

export default Announcement
