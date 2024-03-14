"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _component_dtPicker = common_vendor.resolveComponent("dtPicker");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_easycom_navbar2 + _component_dtPicker + _component_uni_popup)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const popup = common_vendor.ref();
    const qrcodePopup = common_vendor.ref();
    common_vendor.onLoad((options) => {
      main_load(options);
      console.log("这里是service页面，跳转成功");
    });
    const service = common_vendor.ref({});
    const hospitals = common_vendor.ref([]);
    const hospital_index = common_vendor.ref(0);
    const order = common_vendor.reactive({
      // 价格
      price: "",
      // 就诊时间
      starttime: "",
      // 地址
      address: {
        // 姓名
        userName: "",
        // 城市
        cityName: "",
        // 地区
        countyName: "",
        // 地址详情
        detailInfo: ""
      },
      receiveAddress: "",
      tel: "",
      demand: ""
    });
    const cfg = common_vendor.reactive({
      page_xy: "",
      page_fw: ""
    });
    const client = common_vendor.reactive({
      name: ""
    });
    const is_xieyi = common_vendor.ref(false);
    const validMobile = common_vendor.reactive({
      // 手机号码
      phone: "",
      // 验证码
      validCode: ""
    });
    const countdown = common_vendor.reactive({
      validText: "获取验证码",
      time: 60
    });
    const main_load = (options) => {
      app.globalData.utils.request({
        url: "/Service/order",
        data: {
          svid: options.svid
        },
        success: (res2) => {
          service.value = res2.data.service;
          hospitals.value = res2.data.hospitals;
          const hospitalsData = common_vendor.toRaw(hospitals.value);
          console.log(hospitalsData);
          if (options.hid > 0) {
            for (let i = 0; i < hospitalsData.length; i++) {
              if (hospitalsData[i].id == options.hid) {
                hospital_index.value == i;
                order.price == hospitalsData[i].service_price;
                break;
              }
            }
          }
        }
      });
    };
    const handleTap = () => {
    };
    const onHospitalchange = (e) => {
      const value = parseInt(e.detail.value);
      hospital_index.value = value;
      order.price = common_vendor.toRaw(hospitals.value)[value].service_price;
    };
    const onStartTimeChanged = (e) => {
      order.starttime = e.detail.value;
    };
    const onClientChange = () => {
      common_vendor.index.navigateTo({
        url: "../clients/index?act=select"
      });
    };
    common_vendor.index.$on("clientChange", (data) => {
      console.log(data);
      client.name = data.name;
      client.id = data.user_id;
      client.age = data.age;
      client.sex = data.sex;
      client.mobile = data.mobile;
    });
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    const onAddressChange = () => {
      common_vendor.index.chooseAddress({
        success: (res2) => {
          console.log(res2);
          order.address.userName = res2.userName;
          order.address.cityName = res2.cityName;
          order.address.countyName = res2.countyName;
          order.address.detailInfo = res2.detailInfo;
        },
        fail: () => {
          console.log(res, "err");
        }
      });
    };
    let submitOrder;
    const submit = () => {
      if (!is_xieyi.value) {
        return common_vendor.index.showToast({
          title: "请先阅读并同意用户协议和服务协议",
          icon: "none",
          duration: 1e3
        });
      }
      const orderData = common_vendor.toRaw(order);
      const serviceData = common_vendor.toRaw(service.value);
      const hospitalsData = common_vendor.toRaw(hospitals.value);
      const clientData = common_vendor.toRaw(client);
      orderData.service_code = serviceData.code;
      orderData.service_id = serviceData.id;
      orderData.service_name = serviceData.name;
      orderData.service_stype = serviceData.stype;
      if (serviceData.stype < 100) {
        if (hospital_index == 0) {
          return common_vendor.index.showToast({
            title: "请选择医院",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.hospital_id = hospitalsData[hospital_index.value].id;
        orderData.hospital_name = hospitalsData[hospital_index.value].name;
      }
      if (!order.starttime) {
        return common_vendor.index.showToast({
          title: "请选择时间",
          icon: "none",
          duration: 1e3
        });
      }
      if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
        if (!clientData.id) {
          return common_vendor.index.showToast({
            title: "请选择就诊人",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.client = {};
        orderData.client.age = clientData.age;
        orderData.client.number = clientData.number;
        orderData.client.mobile = clientData.mobile;
        orderData.client.name = clientData.name;
        orderData.client.sex = clientData.sex;
        if (serviceData.stype == 15) {
          if (!order.receiveAddress) {
            return common_vendor.index.showToast({
              title: "请填写就诊人所在地址",
              icon: "none",
              duration: 1e3
            });
          }
        }
      }
      if (serviceData.stype == 30 || serviceData.stype == 40) {
        if (!orderData.address.userName) {
          return common_vendor.index.showToast({
            title: "请选择收件信息",
            icon: "none",
            duration: 1e3
          });
        }
      }
      if (!orderData.tel) {
        return common_vendor.index.showToast({
          title: "请填写您的联系方式",
          icon: "none",
          duration: 1e3
        });
      }
      console.log(orderData);
      submitOrder = orderData;
      if (!common_vendor.index.getStorageSync("token")) {
        popup.value.open("center");
      } else {
        createOrder(submitOrder);
      }
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.phone || !validMobile.validCode) {
        return common_vendor.index.showToast({
          title: "请检查手机号码和验证码是否填写",
          icon: "none",
          duration: 1e3
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.phone,
          code: validMobile.validCode
        },
        success: (res2) => {
          common_vendor.index.setStorageSync("token", res2.data.token);
          createOrder(submitOrder);
          popup.value.close();
        },
        fail: (res2) => {
          common_vendor.index.showToast({
            title: res2.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号码",
          icon: "none",
          duration: 1e3
        });
      }
      if (flag)
        return;
      const time = setInterval(() => {
        if (countdown.time <= 0) {
          countdown.validText = "获取验证码";
          countdown.time = 60;
          flag = false;
          clearInterval(time);
        } else {
          countdown.time -= 1;
          countdown.validText = `剩余${countdown.time}s`;
        }
      }, 1e3);
      flag = true;
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.phone
        },
        // 发送成功的回调
        success: (res2) => {
          common_vendor.index.showToast({
            title: "验证码发送成功，请注意查收",
            icon: "none",
            duration: 1e3
          });
        },
        // 发送失败的回调
        fail: (res2) => {
          common_vendor.index.showToast({
            title: res2.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    const createOrder = (orderData) => {
      app.globalData.utils.request({
        url: "/pay/createOrder",
        method: "POST",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: orderData,
        success: (res2) => {
          qrcodePopup.value.open("center");
          const qr = new common_vendor.UQRCode();
          qr.data = res2.wx_code;
          qr.size = 150;
          qr.make();
          var canvasContext = common_vendor.index.createCanvasContext("qrcode");
          qr.canvasContext = canvasContext;
          qr.drawCanvas();
        },
        fail: (res2) => {
        }
      });
    };
    const payment = () => {
      common_vendor.index.switchTab({
        url: "/pages/order/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          isHome: false
        }),
        b: service.value.icon_image ? service.value.icon_image_url : "../../static/images/avatar.jpg",
        c: common_vendor.t(service.value.name),
        d: common_vendor.o(handleTap),
        e: service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20
      }, service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20 ? common_vendor.e({
        f: hospitals.value[hospital_index.value].name,
        g: common_vendor.o(onHospitalchange),
        h: _ctx.hopspital_index,
        i: hospitals.value,
        j: common_vendor.o(onStartTimeChanged),
        k: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择就诊时间"
        }),
        l: client.name,
        m: common_vendor.o(onClientChange),
        n: service.value.stype == 15
      }, service.value.stype == 15 ? {
        o: order.receiveAddress,
        p: common_vendor.o(($event) => order.receiveAddress = $event.detail.value)
      } : {}, {
        q: order.tel,
        r: common_vendor.o(($event) => order.tel = $event.detail.value),
        s: order.demand,
        t: common_vendor.o(($event) => order.demand = $event.detail.value)
      }) : {}, {
        v: service.value.stype == 30 || service.value.stype == 40
      }, service.value.stype == 30 || service.value.stype == 40 ? {
        w: hospitals.value[hospital_index.value].name,
        x: common_vendor.o(onHospitalchange),
        y: hospital_index.value,
        z: hospitals.value,
        A: common_vendor.o(onStartTimeChanged),
        B: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        C: order.address.userName ? order.address.userName + "(" + order.address.cityName + order.address.countyName + order.address.detailInfo + ")" : "",
        D: common_vendor.o(onAddressChange),
        E: order.tel,
        F: common_vendor.o(($event) => order.tel = $event.detail.value),
        G: order.demand,
        H: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {}, {
        I: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        J: common_vendor.o(onXieyiChange),
        K: cfg.page_xy,
        L: cfg.page_fw,
        M: order.price > 0
      }, order.price > 0 ? {
        N: common_vendor.t(order.price)
      } : {}, {
        O: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        P: common_vendor.o(submit),
        Q: validMobile.phone,
        R: common_vendor.o(($event) => validMobile.phone = $event.detail.value),
        S: validMobile.validCode,
        T: common_vendor.o(($event) => validMobile.validCode = $event.detail.value),
        U: common_vendor.t(countdown.validText),
        V: common_vendor.o(countdownChange),
        W: common_vendor.o(cancal),
        X: common_vendor.o(ok),
        Y: common_vendor.sr(popup, "e992cde0-3", {
          "k": "popup"
        }),
        Z: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        aa: common_vendor.o(payment),
        ab: common_vendor.sr(qrcodePopup, "e992cde0-4", {
          "k": "qrcodePopup"
        }),
        ac: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/evan/Documents/HBuilderProjects/ZocDoc-uniapp/pages/service/index.vue"]]);
wx.createPage(MiniProgramPage);
