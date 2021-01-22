import React from "react";

const FooterMenu = ({ styles, history }) => {



  const goToRoute = (payload) => {
    history.push(payload);
  };


  const menuItems = [
    { icon: "fe-airplay", text: "Dashboard", active: true, route: "/dashboard" },
    {
      icon: "fe-globe",
      text: "Company",
      active: false,
      route: "/account",
    },
    {
      icon: "fas fa-bicycle",
      text: "Riders",
      active: false,
      route: "/riders",
    },
    {
        icon: "fas fa-dolly",
        text: "Orders",
        active: false,
        route: "/orders",
      },
  ];


  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        height: styles.footerMenuHeight,
        // backgroundColor: "#333",
        backgroundColor: "rgba(248, 248, 248, 1.92)",
        color: "#000",
        position: "fixed",
        bottom: 0
      }}
      
    >
      {menuItems.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1
            }}
            onClick={() => goToRoute(item.route)}
          >
            <span style={{ fontSize: 20 }}><i className={item.icon}></i> </span>
          </div>
        );
      })}
    </div>
  );
};

export default FooterMenu;