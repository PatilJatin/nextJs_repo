import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/adminpanel/user/user.slice";
import propertiesReducer from "@/redux/features/adminpanel/properties/properties.slice";
import podcastReducer from "@/redux/features/adminpanel/podcasts/podcasts.slice";
import authorReducer from "@/redux/features/adminpanel/authors/authors.slice";
import privacyPolicyReducer from "@/redux/features/adminpanel/privacyPolicy/privacy.slice";
import contactDetailsReducer from "@/redux/features/adminpanel/contactDetails/contact.slice";
import aboutDetailsReducer from "@/redux/features/adminpanel/aboutDetails/aboutDetails.slice";
import homeDetailsReducer from "@/redux/features/adminpanel/homeDetails/homeDetails.slice";
import leadsReducer from "@/redux/features/adminpanel/leads/leads.slice";
import worksheetReducer from "@/redux/features/adminpanel/worksheets/worksheets.slice";
import blog from "@/redux/features/adminpanel/blog/blogs.slice";
import investingInProperties from "@/redux/features/adminpanel/InvestingInProperties/InvestingInProperties.slice";
export const store = configureStore({
  reducer: {
    User: userReducer,
    Property: propertiesReducer,
    Podcast: podcastReducer,
    Authors: authorReducer,
    PrivacyPolicy: privacyPolicyReducer,
    ContactDetails: contactDetailsReducer,
    AboutDetails: aboutDetailsReducer,
    HomeDetails: homeDetailsReducer,
    Leads: leadsReducer,
    Worksheets: worksheetReducer,
    Blog: blog,
    InvestingInProperties: investingInProperties,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
