import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              itemColor: '#F1EBEA',
              linkColor: '#F1EBEA',
              separatorColor: '#F1EBEA',
              lastItemColor: '#F1EBEA',
              linkHoverColor: '#3481EB',
              separatorMargin: 14,
              fontFamily: 'Montserrat',
              colorBgTextHover: 'transparent',
              fontSize: 16,
            },
            Input: {
              colorBgContainer: '#2C2A2E',
              fontFamily: 'Montserrat',
              fontSize: 16,
              colorBorder: '#2C2A2E',
              colorText: '#F1EBEA',
              colorTextPlaceholder: '#929292',
              borderRadiusLG: 10,
              paddingBlock: 13,
              paddingInline: 40,
              hoverBorderColor: '#4E5BAB',
              colorPrimary: '#929292',
              paddingBlockLG: 12,
              paddingInlineLG: 22,
              activeShadow: 'none',
            },
            Select: {
              fontFamily: 'Montserrat',
              colorText: '#F1EBEA',
              colorPrimary: '#3481EB',
              selectorBg: '#2C2A2E',
              singleItemHeightLG: 50,
              optionSelectedColor: '#F1EBEA',
              optionSelectedBg: '#3d6952',
              colorBgElevated: '#2C2A2E',
              colorBorder: 'transparent',
              colorPrimaryHover: '#3481EB',
              borderRadius: 10,
              optionPadding: 10,
              controlHeight: 46,
              controlPaddingHorizontal: 2,
              controlPaddingHorizontalSM: 2,
              optionSelectedFontWeight: 600,
              fontWeightStrong: 600,
              colorIcon: 'rgba(199,180,180,0.45)',
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
