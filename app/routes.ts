import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("patient-profile", "./routes/patient-profile.tsx"),
    route("organization-profile", "./routes/organization-profile.tsx"),
] satisfies RouteConfig;


