export default {
  items: [
    {
      name: "الصفحة الرئيسية",
      url: "/",
      icon: "fa fa-tachometer"
    },
    {
      name: "الفروع",
      url: "/branches",
      icon: "fa fa-list-alt"
    },

    {
      name: "التقارير",
      url: "/",
      icon: "fa fa-list-alt",
      children: [
        {
          name: "التقرير الشهري",
          url: "/",
          icon: "fa fa-list-alt",
          children: [
            {
              name: " التقارير",
              url: "/monthlyReports",
              icon: "fa fa-list-alt"
            },
            {
              name: " الاحصائيات",
              url: "/monthlyStatistics",
              icon: "fa fa-list-alt"
            },
            {
              name: " الاعدادات",
              url: "/monthlyCats",
              icon: "fa fa-list-alt"
            }
          ]
        },
        {
          name: "تقارير الصيانة",
          url: "/",
          icon: "fa fa-exclamation-circle",
          children: [
            {
              name: "  التقارير",
              url: "/maintainanceReports",
              icon: "fa fa-list-alt"
            },
            {
              name: "  شركات الصيانه",
              url: "/maintainanceCompanies",
              icon: "fa fa-list-alt"
            },
            {
              name: " الاحصائيات",
              url: "/maintainanceStatistics",
              icon: "fa fa-list-alt"
            },
            // {
            //   name: "   موظفين الصيانه ",
            //   url: "/",
            //   icon: "fa fa-list-alt"
            // },
            {
              name: "   الاعدادات ",
              url: "/maintainanceCats",
              icon: "fa fa-list-alt"
            },
          ]
        },
        {
          name: "تقارير تقييم المخاطر  ",
          url: "/",
          icon: "fa fa-exclamation-circle",
          children: [
            {
              name: " التقارير",
              url: "/risk",
              icon: "fa fa-list-alt"
            },

            {
              name: " الاحصائيات",
              url: "/RiskStatistic",
              icon: "fa fa-list-alt"
            },

            {
              name: " الاعدادات",
              url: "/Riskcategoris",
              icon: "fa fa-list-alt"
            }
          ]
        },
        {
          name: " الطواريء",
          url: "/EmergencyReport",
          icon: "fa fa-question-circle-o",
          children: [
            {
              name: " تقارير الطواريء",
              url: "/EmergencyReport",
              icon: "fa fa-list-alt"
            },
            {
              name: " احصائيات الطواريء",
              url: "/statisticsEmergancy",
              icon: "fa fa-list-alt"
            }]
        },
        {
          name: " التوعيه",
          url: "/Aware",
          icon: "fa fa-money",
          children: [
            {
              name: " التوعيه",
              url: "/Aware",
              icon: "fa fa-money"
            },
            {
              name: "  احصائيات التدريب",
              url: "/AwareStatistic",
              icon: "fa fa-list-alt"
            }]
        },

        {
          name: "   الحوادث",
          url: "/",
          icon: "fa fa-exclamation-circle",
          children: [
            {
              name: " تقارير الحوادث",
              url: "/incident",
              icon: "fa fa-list-alt"
            },
            {
              name: " احصائيات الحوادث",
              url: "/statisticIncident",
              icon: "fa fa-list-alt"
            }],

        }
      ]
    },
    ,


    {
      name: " الدعم الفني",
      url: "/Tech",
      icon: "fa fa-users"
    },
    
    {
      name: "مستخدمى النظام",
      url: "/users",
      icon: "fa fa-child"
    },
    {
      name: "المدن",
      url: "/cities",
      icon: "fa fa-child"
    },

    {
      name: "تسجيل الخروج",
      url: "/logout",
      icon: "fa fa-sign-out"
    }
  ]
};

