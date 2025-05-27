/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/common/graph-utils.ts
//***********************************************************************************************
class TRect {
    constructor(left, top, right, bottom) {
        this.Left = 0;
        this.Top = 0;
        this.Right = 0;
        this.Bottom = 0;
        this.Left = left;
        this.Top = top;
        this.Right = right;
        this.Bottom = bottom;
    }
    clone() { return new TRect(this.Left, this.Top, this.Right, this.Bottom); }
    equalsTo(r) { return r.Left == this.Left && r.Top == this.Top && r.Right == this.Right && r.Bottom == this.Bottom; }
    Width() { return this.Right - this.Left; }
    Height() { return this.Bottom - this.Top; }
    midX() { return this.Left + (this.Right - this.Left) / 2; }
    midY() { return this.Top + (this.Bottom - this.Top) / 2; }
    containsPoint(nX, nY) { return nX >= this.Left && nX <= this.Right && nY >= this.Top && nY <= this.Bottom; }
    floorCoords() { this.Left = Math.floor(this.Left); this.Top = Math.floor(this.Top); this.Right = Math.floor(this.Right); this.Bottom = Math.floor(this.Bottom); }
    offsetRect(dx, dy) { this.Left += dx; this.Right += dx; this.Top += dy; this.Bottom += dy; }
}
//***********************************************************************************************
class TSimpleRgn {
    constructor() {
        this.rectangles = [];
        this.boundsRect = new TRect(0, 0, 0, 0);
    }
    addRect(v) {
        var rect = v.clone();
        GraphUtils.normalizeRect(rect);
        if (this.rectangles.length == 0)
            this.boundsRect = rect.clone();
        else {
            this.boundsRect.Left = Math.min(this.boundsRect.Left, rect.Left);
            this.boundsRect.Top = Math.min(this.boundsRect.Top, rect.Top);
            this.boundsRect.Right = Math.max(this.boundsRect.Right, rect.Right);
            this.boundsRect.Bottom = Math.max(this.boundsRect.Bottom, rect.Bottom);
        }
        this.rectangles.push(rect);
    }
    ;
    containsPoint(x, y) {
        for (var i = this.rectangles.length - 1; i >= 0; i--)
            if (this.rectangles[i].containsPoint(x, y))
                return true;
        return false;
    }
    getBoundsRect() { return this.boundsRect.clone(); }
}
//***********************************************************************************************
//***********************************************************************************************
//***********************************************************************************************
class TPoint {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    clone() { return new TPoint(this.x, this.y); }
    equalsTo(r) { return r.x == this.x && r.y == this.y; }
}
//***********************************************************************************************
//***********************************************************************************************
//***********************************************************************************************
class TSize {
    constructor(cx = 0, cy = 0) {
        this.cx = cx;
        this.cy = cy;
    }
    clone() { return new TSize(this.cx, this.cy); }
    equalsTo(r) {
        return r.cx == this.cx && r.cy == this.cy;
    }
}
//***********************************************************************************************
//**********************************************************************************************
//***********************************************************************************************
class GraphUtils {
    static normalizeRect(rect) { }
    static createCanvas(width, height) {
        let canvas;
        if (typeof OffscreenCanvas === "undefined") {
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
        }
        else
            canvas = new OffscreenCanvas(width, height);
        return canvas;
    }
    //***********************************************************************************************
    static setupCtx(canvas, transparent = true) {
        const ctx = canvas.getContext('2d', { alpha: transparent });
        if (ctx) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.translate(0.5, 0.5);
        }
        return ctx;
    }
    //***********************************************************************************************
    static blendRect(ctx, opacity, rect, blendColor, frameWidth, frameColor) {
        ctx.fillStyle = blendColor;
        ctx.globalAlpha = 1 - opacity;
        ctx.fillRect(rect.Left, rect.Top, rect.Width(), rect.Height());
        ctx.globalAlpha = 1;
        if (frameWidth > 0) {
            ctx.strokeStyle = frameColor;
            ctx.lineWidth = frameWidth;
            ctx.strokeRect(rect.Left, rect.Top, rect.Width(), rect.Height());
        }
    }
    //*************************************************************************************
    static dashRect(ctx, x, y, width, height, step) {
        let w = Math.max(width, height) + Math.min(width, height);
        ctx.beginPath();
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += step) {
            ctx.moveTo(x + 0, y + i);
            ctx.lineTo(x + i, y);
            ctx.moveTo(x + width - i, y);
            ctx.lineTo(x + width, y + i);
        }
        ctx.stroke();
    }
    //*************************************************************************************
    static drawTextSingle(ctx, text, options, position, maxWidth, draw = true) {
        const bold = options.fontStyle.indexOf("B") !== -1 ? "bold" : "";
        const italic = options.fontStyle.indexOf("I") !== -1 ? "italic" : "";
        const underlined = options.fontStyle.indexOf("U") !== -1;
        const strikeout = options.fontStyle.indexOf("S") !== -1;
        const calcRealWidth = function (element) { element.realWidth = Math.max(element.width, element.actualBoundingBoxLeft + element.actualBoundingBoxRight); };
        ctx.font = `${bold} ${italic} ${options.fontSize}px ${options.fontName}`,
            ctx.fillStyle = options.fontColor;
        let words = text.trimEnd().split(' ');
        if (!words.length)
            return { width: 0, height: 0, nextLineY: 0, gap: 0 };
        let lines = [];
        let prevLine = words[0], prevMetrics = ctx.measureText(prevLine), fontHeight = 0, calcMaxWidth = 0;
        calcRealWidth(prevMetrics);
        for (let i = 1; i <= words.length; ++i) {
            let fLast = i == words.length;
            let nextLine = prevLine + (fLast ? "" : (" " + words[i]));
            let nextMetrics = ctx.measureText(nextLine.trimEnd());
            calcRealWidth(nextMetrics);
            if ((maxWidth > 0 && nextMetrics.realWidth > maxWidth) || fLast) {
                lines.push({ string: prevLine, metrics: prevMetrics });
                calcMaxWidth = Math.max(calcMaxWidth, prevMetrics.realWidth);
                if (!fLast) {
                    prevLine = words[i];
                    prevMetrics = ctx.measureText(words[i]);
                    calcRealWidth(prevMetrics);
                }
            }
            else {
                prevMetrics = nextMetrics;
                prevLine = nextLine;
            }
        }
        ctx.textBaseline = 'top';
        let t = ctx.measureText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
        let tDown = typeof t.fontBoundingBoxDescent === "undefined" ? t.actualBoundingBoxDescent : t.fontBoundingBoxDescent;
        fontHeight = typeof t.fontBoundingBoxDescent === "undefined" ? (t.actualBoundingBoxDescent - t.actualBoundingBoxAscent) * 1.2 : t.fontBoundingBoxDescent + t.fontBoundingBoxAscent;
        let curY = 0;
        const gap = fontHeight * 0.2;
        if (draw) {
            if (maxWidth > 0) {
                ctx.save();
                ctx.rect(position.x - 0.5, position.y - 0.5, maxWidth, 9999999);
                ctx.clip();
            }
            lines.forEach(element => {
                let line = element.string;
                let ellipsis = "";
                while (maxWidth > 0 && element.metrics.realWidth > maxWidth && line.length > 0) {
                    ellipsis = ellipsis || "...";
                    line = line.substring(0, line.length - 1);
                    element.metrics = ctx.measureText(line + ellipsis);
                    calcRealWidth(element.metrics);
                }
                let nOffsetX = 0;
                if (maxWidth <= 0)
                    maxWidth = calcMaxWidth;
                switch (options.alignment) {
                    case 'right':
                        nOffsetX = maxWidth - element.metrics.realWidth;
                        break;
                    case 'center':
                        nOffsetX = Math.floor((maxWidth - element.metrics.realWidth) / 2);
                        break;
                }
                ctx.fillText(line + ellipsis, nOffsetX + position.x, position.y + curY);
                if (strikeout || underlined) {
                    ctx.strokeStyle = options.fontColor;
                    ctx.lineWidth = Math.ceil(options.fontSize / 15);
                    ctx.beginPath();
                    const modifiedHeight = Math.floor(fontHeight * 0.85) - ctx.lineWidth;
                    if (strikeout) {
                        ctx.moveTo(Math.floor(nOffsetX + position.x), Math.floor(position.y + curY + modifiedHeight / 2));
                        ctx.lineTo(Math.floor(nOffsetX + position.x + element.metrics.realWidth), Math.floor(position.y + curY + modifiedHeight / 2));
                    }
                    if (underlined) {
                        ctx.moveTo(Math.floor(nOffsetX + position.x), Math.floor(position.y + curY + tDown));
                        ctx.lineTo(Math.floor(nOffsetX + position.x + element.metrics.realWidth), Math.floor(position.y + curY + tDown));
                    }
                    ctx.stroke();
                }
                curY += fontHeight + gap;
            });
            ctx.restore();
        }
        let nextLineY = (fontHeight + gap) * lines.length;
        t = ctx.measureText(lines[lines.length - 1].string);
        let lastLineHeight = t.fontBoundingBoxDescent ? t.fontBoundingBoxDescent : t.actualBoundingBoxDescent - t.actualBoundingBoxAscent;
        let textHeight = (lines.length > 1 ? (nextLineY - (fontHeight + gap)) : 0) + lastLineHeight;
        //let textHeight = (lines.length > 1 ? (nextLineY - (fontHeight + gap)) : 0) + t.fontBoundingBoxDescent;
        return { width: maxWidth > 0 ? Math.min(maxWidth, calcMaxWidth) : calcMaxWidth, height: textHeight, nextLineY: nextLineY + position.y, gap: gap };
    }
    //*************************************************************************************
    static drawText(ctx, text, options, position, maxWidth, draw = true) {
        if (text === "")
            return { width: 0, height: 0, gap: 0, nextLineY: 0 };
        let lines = text.split('\n'), calcMaxWidth = 0, lastGap = 0, nextLineY = position.y, actualHeight = 0;
        lines.forEach(element => {
            let line = element == "" ? " " : element;
            let exts = this.drawTextSingle(ctx, line, options, new TPoint(position.x, nextLineY), maxWidth, draw);
            actualHeight = nextLineY + exts.height;
            nextLineY = exts.nextLineY;
            calcMaxWidth = Math.max(calcMaxWidth, exts.width);
            lastGap = exts.gap;
        });
        return { width: Math.ceil(calcMaxWidth), height: Math.ceil(actualHeight), gap: lastGap, nextLineY: nextLineY };
    }
    //***********************************************************************************************
    static measureTextSingle(ctx, text, options, maxWidth) {
        return this.drawTextSingle(ctx, text, options, new TPoint(0, 0), maxWidth, false);
    }
    //***********************************************************************************************
    static measureText(ctx, text, options, maxWidth) {
        let metrics = this.drawText(ctx, text, options, new TPoint(0, 0), maxWidth, false);
        return new TSize(metrics.width, metrics.height);
    }
    /*********************************************************************************/
    static textInBox(ctx, text, options, position, maxWidth, draw = true, enlargeToMax = true) {
        const textMargin = 12 + Math.ceil(options.frameWidth / 2);
        let metrics = this.drawText(ctx, text, options, position, maxWidth > 0 ? maxWidth - textMargin * 2 : maxWidth, false);
        let boxWidth = metrics.width + textMargin * 2;
        let boxHeight = metrics.height + textMargin * 2;
        // Если явно задана ширина, то при отрисовке используем её.
        if (enlargeToMax && maxWidth > 0) {
            metrics.width = maxWidth - textMargin * 2;
            boxWidth = maxWidth - 1;
        }
        if (draw) {
            let x = position.x + textMargin, y = position.y + textMargin;
            this.blendRect(ctx, options.backgroundOpacity, new TRect(position.x, position.y, position.x + boxWidth, position.y + boxHeight), options.backgroundColor, options.frameWidth, options.frameColor);
            this.drawText(ctx, text, options, new TPoint(x, y), metrics.width, true);
        }
        return new TSize(boxWidth, boxHeight);
    }
}

;// CONCATENATED MODULE: ./src/js/common/hfw-component.ts

/*********************************************************************************/
class HFWVars {
    constructor(title = "Page title", URL = "Page URL", created = new Date, extents = new TSize(1000, 1000)) {
        this.title = title;
        this.URL = URL;
        this.created = created;
        this.extents = extents;
    }
    ;
}
/*********************************************************************************/
class HFWSettings {
    constructor(mode, data) {
        this.type = "text";
        this.fontName = "Verdana";
        this.fontSize = Math.ceil(15 * self.devicePixelRatio);
        this.fontColor = "#666";
        this.fontStyle = [];
        this.backgroundColor = "#f0f0f0";
        this.frameColor = "#ddd";
        this.frameWidth = 1;
        this.textAlignment = "left";
        this.margin = 50;
        this.template = "Page %p\n%t\n%u";
        this.opacity = 0;
        this.bitmap = "";
        this.bitmapLink = "";
        this.position = 8;
        switch (mode) {
            case "header":
                this.template = "Page %p\n%t\n%u";
                break;
            case "footer":
                this.template = "Captured by FireShot Pro: %d %B %y, %H:%M:%S\nhttps://getfireshot.com";
                this.textAlignment = "center";
                break;
            case "watermark":
                this.template = "Page %p";
                this.opacity = 85;
                this.frameWidth = 0;
                this.fontSize = Math.ceil(150 * self.devicePixelRatio);
                this.backgroundColor = "#fff";
                break;
        }
        if (data) {
            let t = JSON.parse(data);
            for (const key in t) {
                this[key] = t[key];
            }
        }
    }
    serialize() {
        return JSON.stringify(this);
    }
}
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
class HeaderFooter {
    //URL: string, private title: string, private date: Date, protected imageSize: TSize
    constructor(options, vars) {
        this.options = options;
        this.vars = vars;
        this.pageNumber = 1;
        this.options = Object.assign({}, options);
    }
    setPageNumber(pageNumber) { this.pageNumber = pageNumber; }
    /*********************************************************************************/
    padString(str, padding, length) {
        str = str.toString();
        while (str.length < length)
            str = padding + str;
        return str;
    }
    /*********************************************************************************/
    processTemplate() {
        let template = this.options.template;
        template = template.replace(/%y/g, this.vars.created.getFullYear().toString());
        template = template.replace(/%m/g, this.padString((this.vars.created.getMonth() + 1).toString(), "0", 2));
        template = template.replace(/%d/g, this.padString((this.vars.created.getDate()).toString(), "0", 2));
        template = template.replace(/%H/g, this.padString((this.vars.created.getHours()).toString(), "0", 2));
        template = template.replace(/%M/g, this.padString((this.vars.created.getMinutes()).toString(), "0", 2));
        template = template.replace(/%S/g, this.padString((this.vars.created.getSeconds()).toString(), "0", 2));
        template = template.replace(/%A/g, this.vars.created.toLocaleDateString(navigator.language, { weekday: 'long' }));
        template = template.replace(/%B/g, this.vars.created.toLocaleDateString(navigator.language, { month: 'long' }));
        let domain = "";
        try {
            domain = new URL(this.vars.URL).hostname;
        }
        catch (_a) {
            domain = "<Error acquiring domain>";
        }
        ;
        template = template.replace(/%e/g, domain);
        template = template.replace(/%t/g, this.vars.title);
        template = template.replace(/%u/g, this.vars.URL);
        template = template.replace(/%w/g, this.vars.extents.cx.toString());
        template = template.replace(/%h/g, this.vars.extents.cy.toString());
        template = template.replace(/%p/g, this.pageNumber.toString());
        return template;
    }
    /*********************************************************************************/
    getText() {
        return this.processTemplate();
    }
    /*********************************************************************************/
    getMargin() {
        return this.options.margin;
    }
    /*********************************************************************************/
    getOpacity() {
        return this.options.opacity;
    }
    /*********************************************************************************/
    // Для хедеров и футеров в расчёт берётся только cx
    getRect(pageSize) {
        let canvas = GraphUtils.createCanvas(1, 1);
        let ctx = GraphUtils.setupCtx(canvas, false);
        //let ctx = canvas.getContext('2d', {alpha: false});
        let size = this.draw(ctx, new TSize(pageSize.cx, -1), true);
        size.cx++;
        size.cy++;
        return new TRect(0, 0, size.cx, size.cy);
    }
    /*********************************************************************************/
    getURLFromImage() {
        if (this.options.type === "bitmap" && this.options.bitmapLink.length) {
            let URL = this.options.bitmapLink.trim();
            if (URL.length && /(^[a-zA-Z]+:\/\/)/.test(URL))
                return URL;
            else
                return "https://" + URL;
        }
        else
            return "";
    }
    /*********************************************************************************/
    getURLFromText() {
        let vURLs = /([a-zA-Z]+:\/\/.+?)(\s|$)/.exec(this.getText());
        return vURLs && vURLs.length > 1 ? vURLs[1] : "";
    }
    /*********************************************************************************/
    getURL() {
        if (this.options.type === "bitmap")
            return this.getURLFromImage();
        else
            return this.getURLFromText();
    }
    /*********************************************************************************/
    getBitmap(pageSize) {
        let rect = this.getRect(pageSize);
        if (!rect.Width() && !rect.Height())
            return new ImageData(0, 0);
        let ctx = this.getCanvas(pageSize).getContext('2d', { alpha: false });
        if (ctx) {
            //ctx.translate(0.5, 0.5);
            //this.draw(ctx, pageSize);
            return ctx.getImageData(0, 0, rect.Width(), rect.Height());
        }
        else
            return new ImageData(0, 0);
    }
    /*********************************************************************************/
    getCanvas(pageSize) {
        let rect = this.getRect(pageSize);
        let canvas = GraphUtils.createCanvas(rect.Width(), rect.Height());
        let ctx = GraphUtils.setupCtx(canvas, false);
        if (ctx)
            this.draw(ctx, pageSize);
        return canvas;
    }
    /*********************************************************************************/
    draw(ctx, pageExtents, onlySize = false) {
        let options = {
            fontStyle: this.options.fontStyle,
            fontSize: this.options.fontSize,
            fontName: this.options.fontName,
            fontColor: this.options.fontColor,
            alignment: this.options.textAlignment,
            backgroundColor: this.options.backgroundColor,
            backgroundOpacity: 0,
            frameColor: this.options.frameColor,
            frameWidth: this.options.frameWidth
        };
        return GraphUtils.textInBox(ctx, this.getText(), options, new TPoint(0, 0), pageExtents.cx, !onlySize, true);
    }
}
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
class Watermark extends HeaderFooter {
    getSize(pageExtents) {
        let canvas = GraphUtils.createCanvas(1, 1);
        let ctx = GraphUtils.setupCtx(canvas, false);
        return this.draw(ctx, pageExtents, true);
    }
    /*********************************************************************************/
    draw(ctx, pageExtents, onlySize = false) {
        const strConstraints = new TSize(pageExtents.cx - this.options.margin * 2, 0);
        let options = {
            fontStyle: this.options.fontStyle,
            fontSize: this.options.fontSize,
            fontName: this.options.fontName,
            fontColor: this.options.fontColor,
            alignment: this.options.textAlignment,
            backgroundColor: this.options.backgroundColor,
            backgroundOpacity: 0,
            frameColor: this.options.frameColor,
            frameWidth: this.options.frameWidth
        };
        return GraphUtils.textInBox(ctx, this.getText(), options, new TPoint(0, 0), strConstraints.cx, !onlySize, false);
    }
    /*********************************************************************************/
    getRect(pageSize) {
        const strSize = this.getSize(pageSize);
        strSize.cx++;
        strSize.cy++;
        const nWMWidth = strSize.cx;
        const nWMHeight = strSize.cy;
        let nWMX = 0;
        let nWMY = 0;
        let nMargin = this.options.margin;
        let rect = new TRect(0, 0, pageSize.cx, pageSize.cy);
        switch (this.options.position) {
            // smTopLeft
            case 0:
                nWMX = nMargin;
                nWMY = nMargin;
                break;
            // smTopCenter
            case 1:
                nWMX = (rect.Width() - nWMWidth) / 2;
                nWMY = nMargin;
                break;
            // smTopRight
            case 2:
                nWMX = rect.Width() - (nWMWidth + nMargin);
                nWMY = nMargin;
                break;
            // smLeftCenter
            case 3:
                nWMX = nMargin;
                nWMY = (rect.Height() - nWMHeight) / 2;
                break;
            // smRightCenter
            case 4:
                nWMX = rect.Width() - (nWMWidth + nMargin);
                nWMY = (rect.Height() - nWMHeight) / 2;
                break;
            //  smBottomLeft
            case 5:
                nWMX = nMargin;
                nWMY = rect.Height() - (nMargin + nWMHeight);
                break;
            //  smBottomCenter
            case 6:
                nWMX = (rect.Width() - nWMWidth) / 2;
                nWMY = rect.Height() - (nMargin + nWMHeight);
                break;
            //  smBottomRight
            case 7:
                nWMX = rect.Width() - (nWMWidth + nMargin);
                nWMY = rect.Height() - (nMargin + nWMHeight);
                break;
            // Centered
            case 8:
                nWMX = (rect.Width() - nWMWidth) / 2;
                nWMY = (rect.Height() - nWMHeight) / 2;
                break;
        }
        return new TRect(nWMX, nWMY, nWMX + strSize.cx, nWMY + strSize.cy);
    }
}

;// CONCATENATED MODULE: ./src/js/common/pdf-page-metrics.ts

const DEFAULT_PAGE_WIDTH = 8.3;
const DEFAULT_PAGE_HEIGHT = 11.7;
class PDFSettings {
    constructor(data) {
        this.chkMultipagePDF = true;
        this.chkSmartPageBreaks = true;
        this.cmbPageSize = 0;
        this.cmbPageSizeSingle = 0;
        this.edtCustomWidth = 8.3;
        this.cmbCustomWidthUnits = 0;
        this.edtWidthSingle = 8.3;
        this.cmbWidthMeasurementSingle = 0;
        this.edtCustomHeight = 11.7;
        this.cmbCustomHeightUnits = 0;
        this.edtWidth = 8.3;
        this.cmbWidthMeasurement = 0;
        this.edtHeight = 11.7;
        this.cmbHeightMeasurement = 0;
        this.cmbOrientation = 0;
        this.chkSearchablePDF = true;
        this.chkEnableWebLinks = true;
        this.chkAddHeader = true;
        this.chkAddFooter = true;
        this.chkAddWatermark = false;
        this.cmbMarginsMeasurement = 0;
        this.edtLeftMargin = 0.5;
        this.edtTopMargin = 0.5;
        this.edtRightMargin = 0.5;
        this.edtBottomMargin = 0.5;
        if (data) {
            let t = JSON.parse(data);
            for (const key in t) {
                this[key] = t[key];
            }
        }
    }
    serialize() {
        return JSON.stringify(this);
    }
}
/*********************************************************************************/
class PDFPageMetrics {
    /*********************************************************************************/
    constructor(options) {
        this.options = options;
    }
    getUnitsRatio(control) {
        switch (control) {
            case 0:
                return 1;
            case 1:
                return 2.54;
            case 2:
                return 25.4;
            case 3:
                return 72;
            case 4:
                return 6;
            default:
                return 1;
        }
    }
    ;
    /*********************************************************************************/
    getSelectedStockSize() {
        let result = new TSize(0, 0);
        switch (this.options.cmbPageSize) {
            case 1:
                result = new TSize(11.7, 16.5);
                break; //A3
            case 2:
                result = new TSize(8.3, 11.7);
                break; //A4
            case 3:
                result = new TSize(5.8, 8.3);
                break; //A5
            case 4:
                result = new TSize(8.5, 11.0);
                break; //Letter
            case 5:
                result = new TSize(8.5, 14.0);
                break; //Legal
        }
        if (this.options.cmbOrientation == 1) {
            let t = result.cx;
            result.cx = result.cy;
            result.cy = t;
        }
        return result;
    }
    ;
    /*********************************************************************************/
    areMarginsValid() {
        let rfMargins = this.getPageMargins(), pageExtents = this.getPageSize();
        if (!this.options.chkMultipagePDF) {
            if (this.isCustomSize())
                return rfMargins.Left + rfMargins.Right < pageExtents.cx;
            else
                return true;
        }
        else {
            if (this.options.cmbPageSize === 0)
                return true;
            else
                return rfMargins.Left + rfMargins.Right < pageExtents.cx && rfMargins.Top + rfMargins.Bottom < pageExtents.cy;
        }
    }
    /*********************************************************************************/
    toDoubleDef(string, def) {
        const result = parseFloat(string);
        return isNaN(result) ? def : result;
    }
    loadConfig() { }
    saveConfig() { }
    /*********************************************************************************/
    getPageSize() {
        let fltPageWidth = 0, fltPageHeight = 0;
        if (this.options.chkMultipagePDF) {
            if (this.isCustomSize()) {
                fltPageWidth = this.options.edtCustomWidth / this.getUnitsRatio(this.options.cmbCustomWidthUnits);
                if (fltPageWidth <= 0)
                    fltPageWidth = DEFAULT_PAGE_WIDTH;
                fltPageHeight = this.options.edtCustomHeight / this.getUnitsRatio(this.options.cmbCustomHeightUnits);
                if (fltPageHeight <= 0)
                    fltPageHeight = DEFAULT_PAGE_HEIGHT;
            }
            else {
                let sz = this.getSelectedStockSize();
                fltPageWidth = sz.cx;
                fltPageHeight = sz.cy;
            }
        }
        else {
            if (this.isCustomSize()) {
                fltPageWidth = this.options.edtWidthSingle / this.getUnitsRatio(this.options.cmbWidthMeasurementSingle);
                if (fltPageWidth <= 0)
                    fltPageWidth = DEFAULT_PAGE_WIDTH;
            }
        }
        return new TSize(fltPageWidth, fltPageHeight);
    }
    /*********************************************************************************/
    getPageMargins() {
        const fltRatio = this.getUnitsRatio(this.options.cmbMarginsMeasurement);
        const D = (val) => Math.max(0, val / fltRatio);
        return new TRect(D(this.options.edtLeftMargin), D(this.options.edtTopMargin), D(this.options.edtRightMargin), D(this.options.edtBottomMargin));
    }
    /*********************************************************************************/
    isCustomSize() {
        return this.options.chkMultipagePDF ? this.options.cmbPageSize === 6 : this.options.cmbPageSizeSingle === 1;
    }
    isAutocalcHeight() {
        return !this.options.chkMultipagePDF && this.options.cmbPageSizeSingle == 1;
    }
    isSinglePage() {
        return !this.options.chkMultipagePDF; //- закомментировал это, непонятно, по какой логике это было здесь: && this.options.cmbPageSizeSingle == 0;
    }
    isSpecificSize() {
        return (this.options.chkMultipagePDF && this.options.cmbPageSize > 0)
            || (!this.options.chkMultipagePDF && this.options.cmbPageSizeSingle == 1);
    }
    linksEnabled() {
        return this.options.chkEnableWebLinks;
    }
    textEnabled() {
        return this.options.chkSearchablePDF;
    }
    headersEnabled() {
        return this.options.chkAddHeader;
    }
    footersEnabled() {
        return this.options.chkAddFooter;
    }
    watermarksEnabled() {
        return this.options.chkAddWatermark;
    }
    optimizationEnabled() {
        return false;
    }
    smartPageBreaksEnabled() {
        return this.options.chkSmartPageBreaks;
    }
}

;// CONCATENATED MODULE: ./src/js/fsWorkerMessaging.js
/* harmony default export */ function fsWorkerMessaging(listener) {
  if (typeof window != "object" || !window.fsWorkerConnection) {
    onmessage = listener;
    return {
      postMessage: function (a, b) {
	try {
          postMessage(a, b);
        }
        catch (e) {
          postMessage(JSON.parse(JSON.stringify(a)), b);
        }
      },
      isWorker: true
    };
  } else {
    // var randomId = document.currentScript.dataset.id;
    var connection = window.fsWorkerConnection;
    delete window.fsWorkerConnection;

    connection.worker = listener;

    setTimeout(function () {
      connection.msgs.forEach(function (data) {
        connection.worker({ data: data });
      });
    }, 1);

    const isBackgroundPage = document.location.href.indexOf('background_page') > 0;
    return {
      postMessage: function (data) {
        if (isBackgroundPage)
          setTimeout(() => connection.host({ data: data }, 10));
        else
          requestAnimationFrame(() => connection.host({ data: data }));
      },
      isWorker: false
    };
  }
}

;// CONCATENATED MODULE: ./src/js/fsWorker.js





(function()  {
    let encoderScript;

    function cleanup() {
        if (encoderScript) 
            document.head.removeChild(encoderScript);
    }

    function myImportScripts(path) {
        return new Promise((resolve) => {
            //if (false && typeof window != "object")  {
            if (typeof window != "object" || !window.fsWorkerConnection) {
                // В URL передаётся значение devicePixelRatio
                self.devicePixelRatio = parseFloat(new URLSearchParams(location.href.split("?")[1]).get("ratio"));
                importScripts('fsEncoder.js');
                resolve();
            }
            else {
                encoderScript = document.createElement('script');
                encoderScript.src = path;
                encoderScript.async = false;

                encoderScript.onload = resolve;
                //setTimeout(resolve, 10);
                document.head.appendChild(encoderScript);
            }
        });
    }

    myImportScripts('scripts/enc/fsEncoder.js').then(() =>
    Module().then((instance) => {
        //console.log("loaded 1");

        function arrayToPtr(instance, typedArray) {
            const size = typedArray.length * typedArray.BYTES_PER_ELEMENT;
            const ptr = instance._malloc(size);
            instance.HEAPU8.set(typedArray, ptr); 
            return [ptr, size];
        }

        /*********************************************************************************/
        
        function initHandlers(data) {
            let fsHeader = new HeaderFooter(new HFWSettings("header", data.headerSettings), new HFWVars(data.title, data.URL, data.created, new TSize(data.width, data.height)));
            let fsFooter = new HeaderFooter(new HFWSettings("footer", data.footerSettings), new HFWVars(data.title, data.URL, data.created, new TSize(data.width, data.height)));
            let fsWatermark = new Watermark(new HFWSettings("watermark", data.wmSettings), new HFWVars(data.title, data.URL, data.created, new TSize(data.width, data.height)));
            let pdfMetrics = new PDFPageMetrics(new PDFSettings(data.pdfSettings));

            let elementById = (id) => id === 0 ? fsHeader : id === 1 ? fsFooter : fsWatermark;

            self.fsWasmSupport = {
                getText: function(id) {
                    let val = elementById(id).getText() + "\0";
                    let ptr = instance.allocate(instance.intArrayFromString(val), instance.ALLOC_NORMAL);
                    return ptr;
                },

                getURL: function(id) {
                    let val = elementById(id).getURL() + "\0";
                    let ptr = instance.allocate(instance.intArrayFromString(val), instance.ALLOC_NORMAL);
                    return ptr;
                },

                getMargin: function(id) {
                    return elementById(id).getMargin();
                },

                getOpacity: function(id) {
                    return elementById(id).getOpacity();
                },

                setPageNumber: function(id, number) {
                    elementById(id).setPageNumber(number);
                },

                getBitmap: function(id, ptrPageSize) {
                    let size = new TSize(instance.getValue(ptrPageSize, 'i32'), instance.getValue(ptrPageSize + 4, 'i32'));
                    let imgData = elementById(id).getBitmap(size);
                    const typedArray = imgData.data;
        
                    const numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
                    const ptr = instance._malloc(numBytes);
                    instance.HEAPU8.set(typedArray, ptr);

                    const strPtr = instance._malloc(12);

                    instance.setValue(strPtr, imgData.width, 'i32');
                    instance.setValue(strPtr + 4, imgData.height, 'i32');
                    instance.setValue(strPtr + 8, ptr, 'i32');

                    return strPtr;
                },

                getRect: function(id, ptrPageSize, ptrRect) {
                    let size = new TSize(instance.getValue(ptrPageSize, 'i32'), instance.getValue(ptrPageSize + 4, 'i32'));
                    let rect = elementById(id).getRect(size);

                    instance.setValue(ptrRect, rect.Left, 'i32');
                    instance.setValue(ptrRect + 4, rect.Top, 'i32');
                    instance.setValue(ptrRect + 8, rect.Right, 'i32');
                    instance.setValue(ptrRect + 12, rect.Bottom, 'i32');
                },

                isCustomSize: function() {
                    return pdfMetrics.isCustomSize();
                },

                isAutocalcHeight: function() {
                    return pdfMetrics.isAutocalcHeight();
                },

                isSinglePage: function() {
                    return pdfMetrics.isSinglePage();
                },

                isSpecificSize: function() {
                    return pdfMetrics.isSpecificSize();
                },

                linksEnabled: function() {
                    return pdfMetrics.linksEnabled();
                },

                textEnabled: function() {
                    return pdfMetrics.textEnabled();
                },

                headersEnabled: function() {
                    return pdfMetrics.headersEnabled();
                },

                footersEnabled: function() {
                    return pdfMetrics.footersEnabled();
                },

                watermarksEnabled: function() {
                    return pdfMetrics.watermarksEnabled();
                },

                optimizationEnabled: function() {
                    return pdfMetrics.optimizationEnabled();
                },

                smartPageBreaksEnabled: function() {
                    return pdfMetrics.smartPageBreaksEnabled();
                },

                getPageSize: function(ptrWidthFloat, ptrHeightFloat) {
                    const size = pdfMetrics.getPageSize();
                    instance.setValue(ptrWidthFloat, size.cx, 'float');
                    instance.setValue(ptrHeightFloat, size.cy, 'float');
                },

                getPageMargins: function(ptrMargins) {
                    let margins = pdfMetrics.getPageMargins();
                    instance.setValue(ptrMargins, margins.Left, 'float');
                    instance.setValue(ptrMargins + 4, margins.Top, 'float');
                    instance.setValue(ptrMargins + 8, margins.Right, 'float');
                    instance.setValue(ptrMargins + 12, margins.Bottom, 'float');
                }
            };
        }

        let pdfWriter;
        let aborted = false;

        /*********************************************************************************/
        const Worker = fsWorkerMessaging(e => {
            if (aborted) return;
            //console.log('Worker: Message received from main script');
            const data = e.data;
            //console.log(data);
            try {
                switch (data.message) {
                    case "init": 
                        pdfWriter = new instance.TClassTest();
                        initHandlers(data);
                        //let m = instance.addFunction((num) => console.log(num), "vi");
                        //instance._testAPI(m);
                        pdfWriter.initGrabber(data.width, data.height, data.URL, data.title); 

                    break;
                    case "addExtras": 
                        let jsonArr = new TextEncoder("utf-8").encode(data.metadata + "\0");
                        let [jsonPtr, size] = arrayToPtr(instance, jsonArr);
                        pdfWriter.addExtras(jsonPtr);
                        instance._free(jsonPtr);
                    break;

                    case "blit": 
                        let [ptr, size1] = arrayToPtr(instance, data.imageData);
                        pdfWriter.blitFragment(data.dstX, data.dstY, data.dstW, data.dstH, ptr, data.bufWidth, data.bufHeight, data.srcX, data.srcY);

                        Worker.postMessage({message: "blitDone", totalHeight: data.dstY + data.dstH});
                        //instance._free(ptr);
                    break;

                    case "finalize": 
                        let pdfData = pdfWriter.finalizeGrabber();
                        pdfWriter.delete();
                        let blob = new Blob([pdfData], {type: "application/pdf"});
                        Worker.postMessage({message: "completed", result: blob});
                    break;
                } 
            }  
            catch (e) {
                aborted = true;
                cleanup();
                //console.error(e);
                //Worker.postMessage({message: "completed", result: null});
                Worker.postMessage({message: "abort", data: e});    
            }
        });

        Worker.postMessage({message: "loaded"});
    /*
        return;

        console.time("pdf"); 
        pdfWriter.initGrabber(capResult.width, capResult.height);

        let ctx = capResult.getContext('2d', {alpha: false});
        
        const fragmentHeight = 600;
        let totalWritten = 0;

        while (totalWritten < capResult.height) {
            const currentHeight = Math.min(fragmentHeight, capResult.height - totalWritten);
            let imageData = ctx.getImageData(0, totalWritten, capResult.width, currentHeight);

            const numBytes = imageData.data.length * imageData.data.BYTES_PER_ELEMENT;
            const ptr = instance._malloc(numBytes);
            instance.HEAPU8.set(imageData.data, ptr);

            pdfWriter.blitFragment(0, totalWritten, capResult.width, currentHeight, ptr, capResult.width, currentHeight, 0, 0);
                
            instance._free(ptr);
            totalWritten += currentHeight;
        }

        let metadata = JSON.stringify({links:capLinks, words: capWords});
        let jsonArr = new TextEncoder("utf-8").encode(metadata + "\0");
        let [jsonPtr, size] = arrayToPtr(instance, jsonArr);
        pdfWriter.addExtras(jsonPtr);
        instance._free(jsonPtr);

        let pdfData = pdfWriter.finalizeGrabber();
        pdfWriter.delete();

        var blob = new Blob([pdfData], {type: "application/octet-binary"});
        var objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.text = "download";
        link.download = "result-pdf.pdf";
        document.body.prepend(link);
        console.timeEnd("pdf"); 

        //console.log(t.doTest("Hello"));*/
    })).catch(e => {
        console.error(e);
        cleanup();
        fsWorkerMessaging(e => {}).postMessage({message: "abort", data: e});
    });
})();
/******/ })()
;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a1a4cf40-fbb2-57a6-a5b7-3d889d3bf689")}catch(e){}}();
//# sourceMappingURL=fsWorker.js.map
//# debugId=a1a4cf40-fbb2-57a6-a5b7-3d889d3bf689
