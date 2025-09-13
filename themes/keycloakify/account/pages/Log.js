import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getKcClsx } from "../../account/lib/kcClsx";
export default function Log(props) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { log } = kcContext;
    const { msg } = i18n;
    return (_jsx(Template, Object.assign({}, { kcContext, i18n, doUseDefaultCss, classes }, { active: "log" }, { children: _jsxs("div", Object.assign({ className: kcClsx("kcContentWrapperClass") }, { children: [_jsx("div", Object.assign({ className: "col-md-10" }, { children: _jsx("h2", { children: msg("accountLogHtmlTitle") }) })), _jsxs("table", Object.assign({ className: "table table-striped table-bordered" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("td", { children: msg("date") }), _jsx("td", { children: msg("event") }), _jsx("td", { children: msg("ip") }), _jsx("td", { children: msg("client") }), _jsx("td", { children: msg("details") })] }) }), _jsx("tbody", { children: log.events.map((event, index) => (_jsxs("tr", { children: [_jsx("td", { children: event.date ? new Date(event.date).toLocaleString() : "" }), _jsx("td", { children: event.event }), _jsx("td", { children: event.ipAddress }), _jsx("td", { children: event.client || "" }), _jsx("td", { children: event.details.map((detail, detailIndex) => (_jsxs("span", { children: [`${detail.key} = ${detail.value}`, detailIndex < event.details.length - 1 && ", "] }, detailIndex))) })] }, index))) })] }))] })) })));
}
//# sourceMappingURL=Log.js.map