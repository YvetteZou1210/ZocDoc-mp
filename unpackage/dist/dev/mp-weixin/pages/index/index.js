"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  _easycom_navbar2();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const app = getApp();
    const slides = common_vendor.reactive([
      {
        id: 1,
        image: "../../static/images/swiper-1.jpg"
      },
      {
        id: 2,
        image: "../../static/images/swiper-2.jpg"
      },
      {
        id: 3,
        image: "../../static/images/swiper-3.jpg"
      }
    ]);
    const nav2s = common_vendor.ref([]);
    const navs = common_vendor.ref([]);
    const hospitals = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      app.globalData.utils.getUserInfo();
      app.globalData.utils.request({
        url: "/app/init",
        success: (res) => {
          const { id } = res.data.area;
          app.globalData.utils.request({
            url: "/Index/index",
            data: {
              // 将地区的id赋值给aid
              aid: id
            },
            success: ({ data }) => {
              console.log(data);
              nav2s.value = data.nav2s;
              navs.value = data.navs.map((item) => ({
                ...item,
                title: ""
              }));
              hospitals.value = data.hospitals;
            }
          });
        }
      });
    });
    const onNav2sTap = (e) => {
      const nav = common_vendor.toRaw(nav2s.value)[e.currentTarget.dataset.index];
      jump(nav);
    };
    const onNavsTap = (e) => {
      const nav = common_vendor.toRaw(navs.value)[e.currentTarget.dataset.index];
      jump(nav);
    };
    const jump = (nav, type) => {
      if (nav.stype == 1) {
        common_vendor.index.navigateTo({
          url: nav.stype_link
        });
      }
    };
    const toHospitals = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/hospital/index?hid=" + e.currentTarget.dataset.hid
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          isHome: true
        }),
        b: slides && slides.length > 0
      }, slides && slides.length > 0 ? {
        c: common_vendor.f(slides, (item, index, i0) => {
          return {
            a: item.image,
            b: index,
            c: index
          };
        })
      } : {}, {
        d: nav2s.value && nav2s.value.length > 0
      }, nav2s.value && nav2s.value.length > 0 ? {
        e: common_vendor.f(nav2s.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.o(onNav2sTap, index),
            c: index,
            d: index
          };
        })
      } : {}, {
        f: navs.value && navs.value.length > 0
      }, navs.value && navs.value.length > 0 ? {
        g: common_vendor.f(navs.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.t(item.title),
            c: common_vendor.o(onNavsTap, index),
            d: index,
            e: index
          };
        })
      } : {}, {
        h: common_vendor.f(hospitals.value, (item, index, i0) => {
          return {
            a: item.avatar ? item.avatar_url : "../../static/resource/images/avatar.jpg",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.rank),
            d: common_vendor.t(item.label),
            e: common_vendor.t(item.intro),
            f: item.id,
            g: item.id,
            h: common_vendor.o(toHospitals, item.id)
          };
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/evan/Documents/HBuilderProjects/ZocDoc-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
