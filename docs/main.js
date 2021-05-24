(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\dian_\OneDrive\Desktop\angular\voice-collaborator\src\main.ts */"zUnb");


/***/ }),

/***/ "2/4T":
/*!*************************************!*\
  !*** ./src/app/document.service.ts ***!
  \*************************************/
/*! exports provided: DocumentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentService", function() { return DocumentService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DEFAULT_CONTENT = `
# Awesome Editor!

It has been _released as opensource in 2018_ and has evolved to **receive 10k GitHub ⭐️ Stars**.
`;
class DocumentService {
    constructor() {
        this.documents = [];
        this.documentsSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](this.documents);
        const raw = localStorage.getItem('documents');
        this.documentsSource.subscribe(documents => this.documents = documents);
        if (raw) {
            this.documentsSource.next(JSON.parse(raw));
        }
    }
    filterById(id) {
        const keepDocumentById = (document) => document.id !== id;
        this.documents = this.documents.filter(keepDocumentById);
    }
    update() {
        this.documentsSource.next(this.documents);
        localStorage.setItem('documents', JSON.stringify(this.documents));
    }
    static getDefaultDocumentContent() {
        return DEFAULT_CONTENT;
    }
    getDocumentContent(id) {
        var _a;
        const getDocumentById = (document) => document.id === id;
        return (_a = this.documents.find(getDocumentById)) === null || _a === void 0 ? void 0 : _a.content;
    }
    save(content, id) {
        this.filterById(id);
        this.documents.unshift({ id, content });
        this.update();
    }
    delete(id) {
        this.filterById(id);
        this.update();
    }
}
DocumentService.ɵfac = function DocumentService_Factory(t) { return new (t || DocumentService)(); };
DocumentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DocumentService, factory: DocumentService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "2NxN":
/*!********************************************!*\
  !*** ./src/app/viewer/viewer.component.ts ***!
  \********************************************/
/*! exports provided: ViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewerComponent", function() { return ViewerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _document_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../document.service */ "2/4T");
/* harmony import */ var _settings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../settings.service */ "O+7k");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../nav/nav.component */ "izVM");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");









const _c0 = ["viewer"];
function ViewerComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Tip: To search by voice you will have to index some content. Go to ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Edit, select the desired text and then tap the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " 'Insert Text' icon. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ViewerComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ViewerComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx_r3.activeMicClassName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.transcript);
} }
const REMOVE_ACTIVE_MIC_CLASSNAME_DELAY = 1000;
class ViewerComponent {
    constructor(route, documentService, settingsService, cdRef, ngZone) {
        this.route = route;
        this.documentService = documentService;
        this.settingsService = settingsService;
        this.cdRef = cdRef;
        this.ngZone = ngZone;
        this.content = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.activeMicSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.activeMicClassName = false;
        this.transcript = '';
        this.output = '';
    }
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.wakeSubscription$ = this.content
            .subscribe((transcript) => this.ngZone.run(() => this.transcript = transcript));
        this.activeMicSubscription$ = this.activeMicSource
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(REMOVE_ACTIVE_MIC_CLASSNAME_DELAY))
            .subscribe((value) => this.ngZone.run(() => this.activeMicClassName = value));
        //this.content.next('Tip: To search by voice you will have to index some content. Go to Edit mode, select the desired text and then tap the Insert Text icon.');
    }
    ngAfterViewInit() {
        new toastui.Editor.factory({
            el: this.$viewer.nativeElement,
            viewer: true,
            initialValue: this.documentService.getDocumentContent(this.id),
            height: '100vh',
            events: {
                load: () => {
                    const $refs = this.$viewer.nativeElement.querySelectorAll('del');
                    console.log(901, $refs.length);
                    if ($refs.length === 0) {
                        this.output = 'index';
                        this.cdRef.detectChanges();
                        // this.content.next('Tip: To search by voice you will have to index some content. Go to Edit mode, select the desired text and then tap the Insert Text icon.');
                        return false;
                    }
                    const paragraphs = Array.from($refs, ($el) => $el.textContent.toLowerCase().match(/\b(\w|')+\b/gim));
                    const tags = this.settingsService.tags.map((tag) => tag.value);
                    const tagsList = tags.map(tag => `"${tag}"`).join(', ');
                    var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
                    var recognition = new SpeechRecognition();
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    var final_transcript = '';
                    let matches = 0;
                    this.content.next(`Tip: You can activate Voice Search by saying ${tagsList}.`);
                    this.cdRef.detectChanges();
                    // This runs when the speech recognition service returns result
                    recognition.onresult = (event) => {
                        var _a;
                        var interim_transcript = '';
                        for (var i = event.resultIndex; i < event.results.length; ++i) {
                            if (event.results[i].isFinal) {
                                final_transcript += event.results[i][0].transcript;
                            }
                            else {
                                interim_transcript += event.results[i][0].transcript;
                            }
                        }
                        if (interim_transcript === '') {
                            matches = 0;
                        }
                        else {
                            const findTags = (tag) => new RegExp(`(^|\\s)${tag}(\\s|$)`, 'i').test(interim_transcript);
                            const activateSearch = tags.some(findTags);
                            console.log(105, interim_transcript);
                            this.content.next(interim_transcript);
                            this.activeMicClassName = true;
                            this.activeMicSource.next(false);
                            if (activateSearch) {
                                const keywords = (_a = interim_transcript.match(/\b(\w|')+\b/gim)) !== null && _a !== void 0 ? _a : [];
                                paragraphs.forEach((paragraph, idx) => {
                                    var _a;
                                    const paragraphMatches = paragraph.filter(value => keywords.includes(value)).length;
                                    if (paragraphMatches > matches) {
                                        console.log(105, paragraphMatches, matches);
                                        matches = paragraphMatches;
                                        // refIdx = idx;
                                        const $el = $refs[idx];
                                        if ($el.classList.contains('target') === false) {
                                            (_a = this.$viewer.nativeElement.querySelector('.target')) === null || _a === void 0 ? void 0 : _a.classList.remove('target');
                                            $el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                                            $el.classList.add('target');
                                        }
                                    }
                                });
                            }
                        }
                        var confidence = event.results[0][0].confidence;
                        console.log(102, final_transcript, 103, interim_transcript, confidence);
                    };
                    // start recognition
                    recognition.start();
                }
            },
        });
    }
    ngOnDestroy() {
        this.wakeSubscription$.unsubscribe();
        this.activeMicSubscription$.unsubscribe();
    }
}
ViewerComponent.ɵfac = function ViewerComponent_Factory(t) { return new (t || ViewerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_document_service__WEBPACK_IMPORTED_MODULE_4__["DocumentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_settings_service__WEBPACK_IMPORTED_MODULE_5__["SettingsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"])); };
ViewerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ViewerComponent, selectors: [["app-viewer"]], viewQuery: function ViewerComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.$viewer = _t.first);
    } }, decls: 10, vars: 4, consts: [[1, "viewer"], ["viewer", ""], [3, "ngSwitch"], ["class", "tip", 4, "ngSwitchCase"], ["class", "output", 3, "active", 4, "ngSwitchDefault"], [1, "nav-item"], ["title", "Edit Document", "translate", "", 1, "nav-link", "edit-icon", 3, "routerLink"], [1, "tip"], [1, "edit-icon", "inline-icon"], [1, "tui-indexed", "inline-icon"], [1, "output"]], template: function ViewerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](2, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ViewerComponent_div_3_Template, 6, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ViewerComponent_div_4_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ViewerComponent_div_5_Template, 2, 3, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "app-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "_edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitch", ctx.output);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "index");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSwitchCase", "muted");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/edit/", ctx.id, "");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgSwitchDefault"], _nav_nav_component__WEBPACK_IMPORTED_MODULE_7__["NavComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateDirective"]], styles: ["[_nghost-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n}\r\n.viewer[_ngcontent-%COMP%] {\r\n    height: 100vh;\r\n    overflow: auto;\r\n}\r\n.tip[_ngcontent-%COMP%], .output[_ngcontent-%COMP%] {\r\n    padding: 6px 10px;\r\n    border-top: 1px solid rgba(0, 0, 0, .1);\r\n    color: #3c709b;\r\n}\r\n.tip[_ngcontent-%COMP%] {\r\n    color: #db0000;\r\n}\r\n.output[_ngcontent-%COMP%]:before {\r\n    content: url('/assets/images/mic.svg');\r\n    display: block;\r\n    float: right;\r\n    width: 20px;\r\n    height: 20px;\r\n    opacity: .6;\r\n}\r\n.output.active[_ngcontent-%COMP%]:before {\r\n    opacity: 1;\r\n    filter: invert(38%) sepia(93%) saturate(323%) hue-rotate(165deg) brightness(87%) contrast(86%);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsY0FBYztBQUNsQjtBQUNBOztJQUVJLGlCQUFpQjtJQUNqQix1Q0FBdUM7SUFDdkMsY0FBYztBQUNsQjtBQUNBO0lBQ0ksY0FBYztBQUNsQjtBQUNBO0lBQ0ksc0NBQXNDO0lBQ3RDLGNBQWM7SUFDZCxZQUFZO0lBQ1osV0FBVztJQUNYLFlBQVk7SUFDWixXQUFXO0FBQ2Y7QUFDQTtJQUNJLFVBQVU7SUFDViw4RkFBOEY7QUFDbEciLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbn1cclxuLnZpZXdlciB7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbn1cclxuLnRpcCxcclxuLm91dHB1dCB7XHJcbiAgICBwYWRkaW5nOiA2cHggMTBweDtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4xKTtcclxuICAgIGNvbG9yOiAjM2M3MDliO1xyXG59XHJcbi50aXAge1xyXG4gICAgY29sb3I6ICNkYjAwMDA7XHJcbn1cclxuLm91dHB1dDpiZWZvcmUge1xyXG4gICAgY29udGVudDogdXJsKCcvYXNzZXRzL2ltYWdlcy9taWMuc3ZnJyk7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgb3BhY2l0eTogLjY7XHJcbn1cclxuLm91dHB1dC5hY3RpdmU6YmVmb3JlIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICBmaWx0ZXI6IGludmVydCgzOCUpIHNlcGlhKDkzJSkgc2F0dXJhdGUoMzIzJSkgaHVlLXJvdGF0ZSgxNjVkZWcpIGJyaWdodG5lc3MoODclKSBjb250cmFzdCg4NiUpO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "70H3":
/*!************************************************!*\
  !*** ./src/app/settings/settings.component.ts ***!
  \************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _settings_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings.service */ "O+7k");
/* harmony import */ var _langs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../langs.service */ "bZRP");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../nav/nav.component */ "izVM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");








const _c0 = ["textarea"];
function SettingsComponent_option_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selected", l_r3[0] === ctx_r1.languageName)("disabled", !l_r3[1])("value", i_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](l_r3[0]);
} }
function SettingsComponent_select_12_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const code_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", code_r6[0])("selected", code_r6[0] === ctx_r5.lcid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](code_r6[1]);
} }
function SettingsComponent_select_12_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "select", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function SettingsComponent_select_12_Template_select_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r7.updateLcid($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, SettingsComponent_select_12_option_1_Template, 2, 3, "option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx_r2.lcid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.codes);
} }
class SettingsComponent {
    constructor(settingsService, langsService, translate) {
        var _a;
        this.settingsService = settingsService;
        this.langsService = langsService;
        this.translate = translate;
        this.langs = [];
        this.codes = [];
        this.languageName = 'English';
        this.lcid = (_a = localStorage.getItem('lcid')) !== null && _a !== void 0 ? _a : navigator.language;
        this.assignLanguage = (languages) => {
            const removeDisabled = ([__, disabled]) => Boolean(disabled);
            const langs = languages.filter(removeDisabled);
            const extractLang = () => {
                const iso6391 = this.lcid.slice(0, 2);
                const matchLang = ([_, __, entry]) => entry[0].startsWith(iso6391);
                return langs.find(matchLang);
            };
            let lang = extractLang();
            if (lang === undefined) {
                this.lcid = 'en-US';
                lang = extractLang();
            }
            const [languageName, _, ...codes] = lang || [];
            this.codes = codes;
            this.languageName = languageName;
            this.langs = langs;
        };
    }
    ngOnInit() {
        this.langsService.getData('assets/json/langs.json')
            .subscribe(this.assignLanguage);
    }
    ngAfterViewInit() {
        new Tagify(this.$textarea.nativeElement).addTags(this.settingsService.tags);
        this.subscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(this.$textarea.nativeElement, 'change')
            .subscribe((event) => this.settingsService.save(event.target.value));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    updateLanguage($event) {
        const [languageName, idx, ...codes] = this.langs[Number($event.target.value)];
        this.languageName = languageName;
        this.codes = codes;
        this.lcid = codes[idx - 1][0];
        this.translate.use(this.lcid.slice(0, 2));
        localStorage.setItem('lcid', this.lcid);
    }
    updateLcid($event) {
        this.lcid = $event.target.value;
        localStorage.setItem('lcid', this.lcid);
    }
}
SettingsComponent.ɵfac = function SettingsComponent_Factory(t) { return new (t || SettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_settings_service__WEBPACK_IMPORTED_MODULE_2__["SettingsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_langs_service__WEBPACK_IMPORTED_MODULE_3__["LangsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"])); };
SettingsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SettingsComponent, selectors: [["app-settings"]], viewQuery: function SettingsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.$textarea = _t.first);
    } }, decls: 17, vars: 3, consts: [["translate", "", 1, "page-title"], ["translate", "", 1, "section-title"], ["translate", "", 1, "tag-area"], ["textarea", ""], [1, "lang-area"], [1, "select", 3, "value", "change"], [3, "selected", "disabled", "value", 4, "ngFor", "ngForOf"], ["class", "select", 3, "value", "change", 4, "ngIf"], [1, "nav-item"], ["routerLink", "/info", "title", "Info", "translate", "", 1, "nav-link", "info-icon"], [3, "selected", "disabled", "value"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]], template: function SettingsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "_settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "_wake_up_tags");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "textarea", null, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h2", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "_language");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function SettingsComponent_Template_select_change_10_listener($event) { return ctx.updateLanguage($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, SettingsComponent_option_11_Template, 2, 4, "option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, SettingsComponent_select_12_Template, 2, 2, "select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "app-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "_info");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.languageName);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.langs);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.codes && ctx.codes[1]);
    } }, directives: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _nav_nav_component__WEBPACK_IMPORTED_MODULE_6__["NavComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLinkWithHref"]], styles: ["[_nghost-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n}\r\n.lang-area[_ngcontent-%COMP%] {\r\n    flex: 1;\r\n    text-align: center;\r\n}\r\n.lang-area[_ngcontent-%COMP%], .tag-area[_ngcontent-%COMP%] {\r\n    max-width: 800px;\r\n    margin: 0 auto;\r\n    padding: 8px;\r\n}\r\n.select[_ngcontent-%COMP%] {\r\n    margin: 10px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7QUFDakI7QUFDQTtJQUNJLE9BQU87SUFDUCxrQkFBa0I7QUFDdEI7QUFDQTs7SUFFSSxnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFlBQVk7QUFDaEIiLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxufVxyXG4ubGFuZy1hcmVhIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmxhbmctYXJlYSxcclxuLnRhZy1hcmVhIHtcclxuICAgIG1heC13aWR0aDogODAwcHg7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxuICAgIHBhZGRpbmc6IDhweDtcclxufVxyXG4uc2VsZWN0IHtcclxuICAgIG1hcmdpbjogMTBweDtcclxufSJdfQ== */"] });


/***/ }),

/***/ "7XRC":
/*!***********************************!*\
  !*** ./src/app/script.service.ts ***!
  \***********************************/
/*! exports provided: ScriptService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptService", function() { return ScriptService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ScriptService {
    constructor(rendererFactory) {
        this.rendererFactory = rendererFactory;
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    add(src) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        this.renderer.appendChild(document.body, script);
        return script;
    }
}
ScriptService.ɵfac = function ScriptService_Factory(t) { return new (t || ScriptService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"])); };
ScriptService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ScriptService, factory: ScriptService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "8xJ0":
/*!**************************************************!*\
  !*** ./src/app/documents/documents.component.ts ***!
  \**************************************************/
/*! exports provided: DocumentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentsComponent", function() { return DocumentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _document_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../document.service */ "2/4T");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





const _c0 = ["pane"];
function DocumentsComponent_li_7_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DocumentsComponent_li_7_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const document_r1 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.deleteDocument(document_r1.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "a", 14, 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const document_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("routerLink", "/edit/", document_r1.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("routerLink", "/view/", document_r1.id, "");
} }
class DocumentsComponent {
    constructor(documentService) {
        this.documentService = documentService;
        this.documents = [];
        this.blankId = Date.now().toString();
    }
    ngOnInit() {
        this.subscription$ = this.documentService.documentsSource.subscribe(documents => this.documents = documents);
    }
    ngAfterViewInit() {
        this.panes.toArray().forEach(({ nativeElement }, idx) => {
            new toastui.Editor.factory({
                el: nativeElement,
                viewer: true,
                initialValue: this.documents[idx].content,
                height: '280px',
            });
        });
    }
    deleteDocument(id) {
        if (confirm('Are you sure you want to delete this document?')) {
            this.documentService.delete(id);
        }
    }
    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}
DocumentsComponent.ɵfac = function DocumentsComponent_Factory(t) { return new (t || DocumentsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_document_service__WEBPACK_IMPORTED_MODULE_1__["DocumentService"])); };
DocumentsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DocumentsComponent, selectors: [["app-documents"]], viewQuery: function DocumentsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.panes = _t);
    } }, decls: 19, vars: 2, consts: [["translate", "", 1, "page-title"], [1, "main"], [1, "documents"], [1, "document-item"], ["translate", "", 1, "pane", "blank-document", 3, "routerLink"], ["class", "document-item", 4, "ngFor", "ngForOf"], ["role", "navigation", "itemscope", "itemscope", "itemtype", "http://schema.org/SiteNavigationElement", 1, "nav"], [1, "nav-items"], [1, "nav-item"], ["routerLink", "/info", "title", "Info", "translate", "", 1, "nav-link", "info-icon"], ["routerLink", "/settings", "title", "Settings", "translate", "", 1, "nav-link", "settings-icon"], ["routerLink", "/terms", "title", "Terms", "translate", "", 1, "nav-link", "policy-icon"], [1, "nav-link", "edit-icon", 3, "routerLink"], ["type", "button", 1, "delete-document-button", 3, "click"], [1, "pane", 3, "routerLink"], ["pane", ""]], template: function DocumentsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "_recent_documents");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "_create_a_new_document");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, DocumentsComponent_li_7_Template, 5, 2, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "nav", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ul", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "_info");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "_settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "_terms");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("routerLink", "/edit/", ctx.blankId, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.documents);
    } }, directives: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateDirective"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: ["[_nghost-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n}\r\n.documents[_ngcontent-%COMP%] {\r\n    list-style: none;\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fit, 208px);\r\n    grid-auto-rows: 263px;\r\n    justify-content: center;\r\n    gap: 20px;\r\n    padding: 0;\r\n    margin: 20px;\r\n}\r\n.main[_ngcontent-%COMP%] {\r\n    height: 100vh;\r\n    overflow: auto;\r\n}\r\n.document-item[_ngcontent-%COMP%] {\r\n    position: relative;\r\n}\r\n.pane[_ngcontent-%COMP%] {\r\n    display: block;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n    width: 208px;\r\n    height: 263px;\r\n    padding: 36px 16px 16px;\r\n    border-radius: 3px;\r\n    box-shadow: 0 1px 4px rgb(1 1 1 / 15%);\r\n}\r\n.delete-document-button[_ngcontent-%COMP%], .edit-icon[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    width: 34px;\r\n    height: 34px;\r\n    right: 34px;\r\n}\r\n.blank-document[_ngcontent-%COMP%] {\r\n    color: #666;\r\n    padding-top: 74%;\r\n    text-align: center;\r\n    background-image: url('/assets/images/post_add.svg');\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n    background-size: 24px 24px;\r\n}\r\n.delete-document-button[_ngcontent-%COMP%] {\r\n    right: 8px;\r\n    border: 0;\r\n    background-color: transparent;\r\n    background-image: url('/assets/images/delete.svg');\r\n    background-repeat: no-repeat;\r\n    background-position: center 7px;\r\n    background-size: 20px 20px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3VtZW50cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLDhDQUE4QztJQUM5QyxxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLFNBQVM7SUFDVCxVQUFVO0lBQ1YsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGNBQWM7QUFDbEI7QUFDQTtJQUNJLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksY0FBYztJQUNkLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2YsWUFBWTtJQUNaLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLHNDQUFzQztBQUMxQztBQUNBOztJQUVJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsWUFBWTtJQUNaLFdBQVc7QUFDZjtBQUNBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsb0RBQW9EO0lBQ3BELDRCQUE0QjtJQUM1QiwyQkFBMkI7SUFDM0IsMEJBQTBCO0FBQzlCO0FBQ0E7SUFDSSxVQUFVO0lBQ1YsU0FBUztJQUNULDZCQUE2QjtJQUM3QixrREFBa0Q7SUFDbEQsNEJBQTRCO0lBQzVCLCtCQUErQjtJQUMvQiwwQkFBMEI7QUFDOUIiLCJmaWxlIjoiZG9jdW1lbnRzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbn1cclxuLmRvY3VtZW50cyB7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCAyMDhweCk7XHJcbiAgICBncmlkLWF1dG8tcm93czogMjYzcHg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGdhcDogMjBweDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBtYXJnaW46IDIwcHg7XHJcbn1cclxuLm1haW4ge1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcbi5kb2N1bWVudC1pdGVtIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4ucGFuZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHdpZHRoOiAyMDhweDtcclxuICAgIGhlaWdodDogMjYzcHg7XHJcbiAgICBwYWRkaW5nOiAzNnB4IDE2cHggMTZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDRweCByZ2IoMSAxIDEgLyAxNSUpO1xyXG59XHJcbi5kZWxldGUtZG9jdW1lbnQtYnV0dG9uLFxyXG4uZWRpdC1pY29uIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOiAzNHB4O1xyXG4gICAgaGVpZ2h0OiAzNHB4O1xyXG4gICAgcmlnaHQ6IDM0cHg7XHJcbn1cclxuLmJsYW5rLWRvY3VtZW50IHtcclxuICAgIGNvbG9yOiAjNjY2O1xyXG4gICAgcGFkZGluZy10b3A6IDc0JTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvcG9zdF9hZGQuc3ZnJyk7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XHJcbn1cclxuLmRlbGV0ZS1kb2N1bWVudC1idXR0b24ge1xyXG4gICAgcmlnaHQ6IDhweDtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9kZWxldGUuc3ZnJyk7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIDdweDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogMjBweCAyMHB4O1xyXG59Il19 */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "O+7k":
/*!*************************************!*\
  !*** ./src/app/settings.service.ts ***!
  \*************************************/
/*! exports provided: SettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsService", function() { return SettingsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

const DEFAULT_TAGS = [{ value: 'ok' }, { value: 'fine' }];
class SettingsService {
    constructor() {
        this.tags = [];
        const raw = localStorage.getItem('tags');
        this.tags = raw ? JSON.parse(raw) : DEFAULT_TAGS;
    }
    save(tags) {
        this.tags = tags ? JSON.parse(tags) : [];
        localStorage.setItem('tags', tags || '[]');
    }
}
SettingsService.ɵfac = function SettingsService_Factory(t) { return new (t || SettingsService)(); };
SettingsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SettingsService, factory: SettingsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AppComponent {
    constructor(translate) {
        var _a;
        translate.setDefaultLang(((_a = localStorage.getItem('lcid')) === null || _a === void 0 ? void 0 : _a.slice(0, 2)) || 'en');
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: [".page-title,\r\n.section-title {\r\n    font-size: 20px;\r\n    margin: 20px auto 10px;\r\n    max-width: 800px;\r\n    padding: 5px;\r\n    text-align: center;\r\n    color: #666;\r\n    border-bottom: 1px solid rgba(0, 0, 0, .2);\r\n}\r\n.section-title {\r\n    font-size: 18px;\r\n}\r\n.page-body {\r\n    max-width: 800px;\r\n    margin: auto;\r\n}\r\n.tui-indexed {\r\n    background-image: url('/assets/images/manage_search.svg');\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n    background-size: 22px 22px;\r\n    height: 22px;\r\n    width: 22px;\r\n}\r\n.inline-icon {\r\n    display: inline-block;\r\n    width: 24px;\r\n    height: 24px;\r\n    vertical-align: middle;\r\n}\r\n.tui-indexed.inline-icon {\r\n    margin-top: -4px;\r\n}\r\n.pane .tui-editor-contents {\r\n    height: 100%;\r\n    overflow: hidden;\r\n}\r\n.nav-item {\r\n    flex: 1;\r\n    padding: 0 18px 4px;\r\n}\r\n.nav-link {\r\n    display: block;\r\n    text-decoration: none;\r\n    background-repeat: no-repeat;\r\n    background-position: center 6px;\r\n    background-size: 20px 20px;\r\n    text-align: center;\r\n    padding-top: 28px;\r\n    color: #666;\r\n}\r\n.nav-link:hover {\r\n    color: #666;\r\n    text-decoration: none;\r\n}\r\n.home-icon {\r\n    background-image: url('/assets/images/home.svg');\r\n}\r\n.settings-icon {\r\n    background-image: url('/assets/images/settings.svg');\r\n}\r\n.info-icon {\r\n    background-image: url('/assets/images/info.svg');\r\n}\r\n.policy-icon {\r\n    background-image: url('/assets/images/policy.svg');\r\n}\r\n.edit-icon {\r\n    background-image: url('/assets/images/edit_note.svg');\r\n    background-size: 24px 24px;\r\n}\r\n.tui-md-strike,\r\n.tui-editor-contents del {\r\n    color: #222;\r\n    text-decoration: underline;\r\n}\r\ndel {\r\n    transition: background-color 1s ease 1s;\r\n    background-color: rgba(255, 240, 110, 0);\r\n}\r\n.target {\r\n    background-color: rgba(255, 240, 110, 1);\r\n}\r\n.nav {\r\n    width: 100%;\r\n    border-top: 1px solid rgba(0, 0, 0, .2);\r\n    background: white;\r\n}\r\n.nav-items {\r\n    padding: 0;\r\n    margin: 0;\r\n    list-style: none;\r\n    display: flex;\r\n    justify-content: space-evenly\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztJQUVJLGVBQWU7SUFDZixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsV0FBVztJQUNYLDBDQUEwQztBQUM5QztBQUNBO0lBQ0ksZUFBZTtBQUNuQjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFlBQVk7QUFDaEI7QUFDQTtJQUNJLHlEQUF5RDtJQUN6RCw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osV0FBVztBQUNmO0FBQ0E7SUFDSSxxQkFBcUI7SUFDckIsV0FBVztJQUNYLFlBQVk7SUFDWixzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksWUFBWTtJQUNaLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksT0FBTztJQUNQLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksY0FBYztJQUNkLHFCQUFxQjtJQUNyQiw0QkFBNEI7SUFDNUIsK0JBQStCO0lBQy9CLDBCQUEwQjtJQUMxQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLFdBQVc7QUFDZjtBQUNBO0lBQ0ksV0FBVztJQUNYLHFCQUFxQjtBQUN6QjtBQUNBO0lBQ0ksZ0RBQWdEO0FBQ3BEO0FBQ0E7SUFDSSxvREFBb0Q7QUFDeEQ7QUFDQTtJQUNJLGdEQUFnRDtBQUNwRDtBQUNBO0lBQ0ksa0RBQWtEO0FBQ3REO0FBQ0E7SUFDSSxxREFBcUQ7SUFDckQsMEJBQTBCO0FBQzlCO0FBQ0E7O0lBRUksV0FBVztJQUNYLDBCQUEwQjtBQUM5QjtBQUNBO0lBQ0ksdUNBQXVDO0lBQ3ZDLHdDQUF3QztBQUM1QztBQUNBO0lBQ0ksd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsdUNBQXVDO0lBQ3ZDLGlCQUFpQjtBQUNyQjtBQUNBO0lBQ0ksVUFBVTtJQUNWLFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiO0FBQ0oiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFnZS10aXRsZSxcclxuLnNlY3Rpb24tdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgbWFyZ2luOiAyMHB4IGF1dG8gMTBweDtcclxuICAgIG1heC13aWR0aDogODAwcHg7XHJcbiAgICBwYWRkaW5nOiA1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzY2NjtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIC4yKTtcclxufVxyXG4uc2VjdGlvbi10aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbn1cclxuLnBhZ2UtYm9keSB7XHJcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG59XHJcbi50dWktaW5kZXhlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL21hbmFnZV9zZWFyY2guc3ZnJyk7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAyMnB4IDIycHg7XHJcbiAgICBoZWlnaHQ6IDIycHg7XHJcbiAgICB3aWR0aDogMjJweDtcclxufVxyXG4uaW5saW5lLWljb24ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgd2lkdGg6IDI0cHg7XHJcbiAgICBoZWlnaHQ6IDI0cHg7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG59XHJcbi50dWktaW5kZXhlZC5pbmxpbmUtaWNvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAtNHB4O1xyXG59XHJcbi5wYW5lIC50dWktZWRpdG9yLWNvbnRlbnRzIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuLm5hdi1pdGVtIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICBwYWRkaW5nOiAwIDE4cHggNHB4O1xyXG59XHJcbi5uYXYtbGluayB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgNnB4O1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAyMHB4IDIwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nLXRvcDogMjhweDtcclxuICAgIGNvbG9yOiAjNjY2O1xyXG59XHJcbi5uYXYtbGluazpob3ZlciB7XHJcbiAgICBjb2xvcjogIzY2NjtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4uaG9tZS1pY29uIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvaG9tZS5zdmcnKTtcclxufVxyXG4uc2V0dGluZ3MtaWNvbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL3NldHRpbmdzLnN2ZycpO1xyXG59XHJcbi5pbmZvLWljb24ge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9pbmZvLnN2ZycpO1xyXG59XHJcbi5wb2xpY3ktaWNvbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL3BvbGljeS5zdmcnKTtcclxufVxyXG4uZWRpdC1pY29uIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvZWRpdF9ub3RlLnN2ZycpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XHJcbn1cclxuLnR1aS1tZC1zdHJpa2UsXHJcbi50dWktZWRpdG9yLWNvbnRlbnRzIGRlbCB7XHJcbiAgICBjb2xvcjogIzIyMjtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcbmRlbCB7XHJcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDFzIGVhc2UgMXM7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjQwLCAxMTAsIDApO1xyXG59XHJcbi50YXJnZXQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI0MCwgMTEwLCAxKTtcclxufVxyXG4ubmF2IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjIpO1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbn1cclxuLm5hdi1pdGVtcyB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seVxyXG59XHJcbiJdfQ== */"], encapsulation: 2 });


/***/ }),

/***/ "XSv0":
/*!****************************************!*\
  !*** ./src/app/info/info.component.ts ***!
  \****************************************/
/*! exports provided: InfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoComponent", function() { return InfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nav/nav.component */ "izVM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class InfoComponent {
    constructor() { }
    ngOnInit() {
    }
}
InfoComponent.ɵfac = function InfoComponent_Factory(t) { return new (t || InfoComponent)(); };
InfoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InfoComponent, selectors: [["app-info"]], decls: 26, vars: 0, consts: [["translate", "", 1, "page-title"], [1, "instructions", "page-body"], ["translate", "", 1, "settings-step"], ["translate", "", 1, "tags-step"], ["translate", "", 1, "home-step"], ["translate", "", 1, "new-document-step"], ["translate", "", 1, "edit-step"], ["translate", "", 1, "index-step"], ["translate", "", 1, "preview-step"], ["translate", "", 1, "search-step"], [1, "nav-item"], ["routerLink", "/terms", "title", "Terms", "translate", "", 1, "nav-link", "policy-icon"], ["routerLink", "/settings", "title", "Settings", "translate", "", 1, "nav-link", "settings-icon"]], template: function InfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "_how_to_get_started");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "_go_to_settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "_add_wake_up_tags");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "_go_to_home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "_select_create_a_new_document");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "_design_your_cheat_sheet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "_highlight_the_text");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "_go_to_preview");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "_voice_search_can_be_activated");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "app-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "_terms");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "_settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateDirective"], _nav_nav_component__WEBPACK_IMPORTED_MODULE_2__["NavComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: ["[_nghost-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n}\r\n.instructions[_ngcontent-%COMP%] {\r\n    flex: 1;\r\n    list-style:  none;\r\n    padding: 12px 0 0 0;\r\n}\r\n.settings-step[_ngcontent-%COMP%], .tags-step[_ngcontent-%COMP%], .home-step[_ngcontent-%COMP%], .new-document-step[_ngcontent-%COMP%], .edit-step[_ngcontent-%COMP%], .index-step[_ngcontent-%COMP%], .preview-step[_ngcontent-%COMP%], .search-step[_ngcontent-%COMP%] {\r\n    background-repeat: no-repeat;\r\n    background-position: 6px 0;\r\n    background-size: 20px 20px;\r\n    padding: 0 0 20px 32px;\r\n    color: #666;\r\n    position: relative;\r\n}\r\n.settings-step[_ngcontent-%COMP%]:before, .tags-step[_ngcontent-%COMP%]:before, .home-step[_ngcontent-%COMP%]:before, .new-document-step[_ngcontent-%COMP%]:before, .edit-step[_ngcontent-%COMP%]:before, .index-step[_ngcontent-%COMP%]:before, .preview-step[_ngcontent-%COMP%]:before {\r\n    content: '';\r\n    position: absolute;\r\n    top: 22px;\r\n    left: 15px;\r\n    bottom: 2px;\r\n    width: 2px;\r\n    background-color: #777;\r\n}\r\n.settings-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/settings.svg');\r\n}\r\n.tags-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/new-tag.svg');\r\n}\r\n.home-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/home.svg');\r\n}\r\n.new-document-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/post_add.svg');\r\n}\r\n.edit-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/wysiwyg.svg');\r\n}\r\n.index-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/manage_search.svg');\r\n}\r\n.preview-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/find-in-page.svg');\r\n}\r\n.search-step[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/record-voice-over.svg');\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZm8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtBQUNqQjtBQUNBO0lBQ0ksT0FBTztJQUNQLGlCQUFpQjtJQUNqQixtQkFBbUI7QUFDdkI7QUFDQTs7Ozs7Ozs7SUFRSSw0QkFBNEI7SUFDNUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixzQkFBc0I7SUFDdEIsV0FBVztJQUNYLGtCQUFrQjtBQUN0QjtBQUNBOzs7Ozs7O0lBT0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsVUFBVTtJQUNWLFdBQVc7SUFDWCxVQUFVO0lBQ1Ysc0JBQXNCO0FBQzFCO0FBQ0E7SUFDSSxvREFBb0Q7QUFDeEQ7QUFDQTtJQUNJLG1EQUFtRDtBQUN2RDtBQUNBO0lBQ0ksZ0RBQWdEO0FBQ3BEO0FBQ0E7SUFDSSxvREFBb0Q7QUFDeEQ7QUFDQTtJQUNJLG1EQUFtRDtBQUN2RDtBQUNBO0lBQ0kseURBQXlEO0FBQzdEO0FBQ0E7SUFDSSx3REFBd0Q7QUFDNUQ7QUFDQTtJQUNJLDZEQUE2RDtBQUNqRSIsImZpbGUiOiJpbmZvLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbn1cclxuLmluc3RydWN0aW9ucyB7XHJcbiAgICBmbGV4OiAxO1xyXG4gICAgbGlzdC1zdHlsZTogIG5vbmU7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDAgMCAwO1xyXG59XHJcbi5zZXR0aW5ncy1zdGVwLFxyXG4udGFncy1zdGVwLFxyXG4uaG9tZS1zdGVwLFxyXG4ubmV3LWRvY3VtZW50LXN0ZXAsXHJcbi5lZGl0LXN0ZXAsXHJcbi5pbmRleC1zdGVwLFxyXG4ucHJldmlldy1zdGVwLFxyXG4uc2VhcmNoLXN0ZXAge1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDZweCAwO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAyMHB4IDIwcHg7XHJcbiAgICBwYWRkaW5nOiAwIDAgMjBweCAzMnB4O1xyXG4gICAgY29sb3I6ICM2NjY7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnNldHRpbmdzLXN0ZXA6YmVmb3JlLFxyXG4udGFncy1zdGVwOmJlZm9yZSxcclxuLmhvbWUtc3RlcDpiZWZvcmUsXHJcbi5uZXctZG9jdW1lbnQtc3RlcDpiZWZvcmUsXHJcbi5lZGl0LXN0ZXA6YmVmb3JlLFxyXG4uaW5kZXgtc3RlcDpiZWZvcmUsXHJcbi5wcmV2aWV3LXN0ZXA6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAyMnB4O1xyXG4gICAgbGVmdDogMTVweDtcclxuICAgIGJvdHRvbTogMnB4O1xyXG4gICAgd2lkdGg6IDJweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3Nzc7XHJcbn1cclxuLnNldHRpbmdzLXN0ZXAge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9zZXR0aW5ncy5zdmcnKTtcclxufVxyXG4udGFncy1zdGVwIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvbmV3LXRhZy5zdmcnKTtcclxufVxyXG4uaG9tZS1zdGVwIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvaG9tZS5zdmcnKTtcclxufVxyXG4ubmV3LWRvY3VtZW50LXN0ZXAge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9wb3N0X2FkZC5zdmcnKTtcclxufVxyXG4uZWRpdC1zdGVwIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWFnZXMvd3lzaXd5Zy5zdmcnKTtcclxufVxyXG4uaW5kZXgtc3RlcCB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL21hbmFnZV9zZWFyY2guc3ZnJyk7XHJcbn1cclxuLnByZXZpZXctc3RlcCB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL2ZpbmQtaW4tcGFnZS5zdmcnKTtcclxufVxyXG4uc2VhcmNoLXN0ZXAge1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9yZWNvcmQtdm9pY2Utb3Zlci5zdmcnKTtcclxufSJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule, HttpLoaderFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/http-loader */ "mqiu");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _documents_documents_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./documents/documents.component */ "8xJ0");
/* harmony import */ var _editor_editor_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor/editor.component */ "xD4D");
/* harmony import */ var _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./viewer/viewer.component */ "2NxN");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nav/nav.component */ "izVM");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./settings/settings.component */ "70H3");
/* harmony import */ var _script_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./script.service */ "7XRC");
/* harmony import */ var _info_info_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./info/info.component */ "XSv0");
/* harmony import */ var _terms_terms_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./terms/terms.component */ "eIz4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ "fXoL");
















class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({ providers: [_script_service__WEBPACK_IMPORTED_MODULE_11__["ScriptService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"].forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateLoader"],
                    useFactory: HttpLoaderFactory,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]]
                }
            })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _documents_documents_component__WEBPACK_IMPORTED_MODULE_6__["DocumentsComponent"],
        _editor_editor_component__WEBPACK_IMPORTED_MODULE_7__["EditorComponent"],
        _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_8__["ViewerComponent"],
        _nav_nav_component__WEBPACK_IMPORTED_MODULE_9__["NavComponent"],
        _settings_settings_component__WEBPACK_IMPORTED_MODULE_10__["SettingsComponent"],
        _info_info_component__WEBPACK_IMPORTED_MODULE_12__["InfoComponent"],
        _terms_terms_component__WEBPACK_IMPORTED_MODULE_13__["TermsComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"]] }); })();
// required for AOT compilation
function HttpLoaderFactory(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_3__["TranslateHttpLoader"](http);
}


/***/ }),

/***/ "bZRP":
/*!**********************************!*\
  !*** ./src/app/langs.service.ts ***!
  \**********************************/
/*! exports provided: LangsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LangsService", function() { return LangsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class LangsService {
    constructor(http) {
        this.http = http;
    }
    getData(url) {
        return this.http.get(url);
    }
}
LangsService.ɵfac = function LangsService_Factory(t) { return new (t || LangsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
LangsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LangsService, factory: LangsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "eIz4":
/*!******************************************!*\
  !*** ./src/app/terms/terms.component.ts ***!
  \******************************************/
/*! exports provided: TermsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsComponent", function() { return TermsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nav/nav.component */ "izVM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class TermsComponent {
    constructor() { }
    ngOnInit() {
    }
}
TermsComponent.ɵfac = function TermsComponent_Factory(t) { return new (t || TermsComponent)(); };
TermsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TermsComponent, selectors: [["app-terms"]], decls: 45, vars: 0, consts: [[1, "terms"], ["translate", "", 1, "page-title"], ["translate", "", 1, "page-body"], ["translate", "", 1, "section-title"], [1, "nav-item"], ["routerLink", "/settings", "title", "Settings", "translate", "", 1, "nav-link", "settings-icon"]], template: function TermsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "_terms_and_conditions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "_p1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "_links_to_other_resources");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "_p2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "_prohibited_uses");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "_p3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "_intellectual_property_rights");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "_p4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "_limitation_of_liability");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "_p5");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "_indemnification");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "_p6");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Severability");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "_p7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "_dispute_resolution");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "_p8");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "_changes_and_amendments");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "_p9");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "_acceptance_of_these_terms");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "_p10");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "app-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "_settings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateDirective"], _nav_nav_component__WEBPACK_IMPORTED_MODULE_2__["NavComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: ["[_nghost-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n}\r\n.terms[_ngcontent-%COMP%] {\r\n    overflow: auto;\r\n    padding: 0 1em 2ex;\r\n}\r\n.document-updated[_ngcontent-%COMP%] {\r\n    max-width: 800px;\r\n    width: 100%;\r\n    margin: 24px auto;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1zLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLGFBQWE7QUFDakI7QUFDQTtJQUNJLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsaUJBQWlCO0FBQ3JCIiwiZmlsZSI6InRlcm1zLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbn1cclxuLnRlcm1zIHtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgcGFkZGluZzogMCAxZW0gMmV4O1xyXG59XHJcbi5kb2N1bWVudC11cGRhdGVkIHtcclxuICAgIG1heC13aWR0aDogODAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogMjRweCBhdXRvO1xyXG59Il19 */"] });


/***/ }),

/***/ "izVM":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");



const _c0 = ["*"];
class NavComponent {
}
NavComponent.ɵfac = function NavComponent_Factory(t) { return new (t || NavComponent)(); };
NavComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavComponent, selectors: [["app-nav"]], ngContentSelectors: _c0, decls: 6, vars: 0, consts: [["role", "navigation", "itemscope", "itemscope", "itemtype", "http://schema.org/SiteNavigationElement", 1, "nav"], [1, "nav-items"], [1, "nav-item"], ["routerLink", "/", "title", "Home", "translate", "", 1, "nav-link", "home-icon"]], template: function NavComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "_home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuYXYuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "jp9u":
/*!***********************************!*\
  !*** ./src/app/editor.service.ts ***!
  \***********************************/
/*! exports provided: EditorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorService", function() { return EditorService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _script_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script.service */ "7XRC");



const codes = ['ar', 'cs-cz', 'de-de', 'en-us', 'es-es', 'fi-fi', 'fr-fr', 'gl-es', 'it-it', 'ja-jp', 'ko-kr', 'nb-no', 'nl-nl', 'pl-pl', 'ru-ru', 'sv-se', 'tr-tr', 'uk-ua', 'zh-cn', 'zh-tw'];
class EditorService {
    constructor(scriptService) {
        this.scriptService = scriptService;
        this.scriptSoruce = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('');
        const iso = localStorage.getItem('iso');
        if (iso) {
            const iso6391 = iso.slice(0, 2);
            const i18nFile = codes.find(code => code.startsWith(iso6391));
            console.log(100, i18nFile);
            if (i18nFile) {
                Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(scriptService.add(`https://uicdn.toast.com/editor/latest/i18n/${i18nFile}.js`), 'load')
                    .subscribe(() => this.scriptSoruce.next(i18nFile));
                /* scriptService.add(`https://uicdn.toast.com/editor/latest/i18n/${i18nFile}.js`).onload = () => {
                    console.log('SkyScanner Tag loaded');
                } */
            }
        }
    }
}
EditorService.ɵfac = function EditorService_Factory(t) { return new (t || EditorService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_script_service__WEBPACK_IMPORTED_MODULE_2__["ScriptService"])); };
EditorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: EditorService, factory: EditorService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _documents_documents_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./documents/documents.component */ "8xJ0");
/* harmony import */ var _editor_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor/editor.component */ "xD4D");
/* harmony import */ var _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./viewer/viewer.component */ "2NxN");
/* harmony import */ var _settings_settings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings/settings.component */ "70H3");
/* harmony import */ var _info_info_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./info/info.component */ "XSv0");
/* harmony import */ var _terms_terms_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./terms/terms.component */ "eIz4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [
    { path: '', component: _documents_documents_component__WEBPACK_IMPORTED_MODULE_1__["DocumentsComponent"] },
    { path: 'edit/:id', component: _editor_editor_component__WEBPACK_IMPORTED_MODULE_2__["EditorComponent"] },
    { path: 'view/:id', component: _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_3__["ViewerComponent"] },
    { path: 'settings', component: _settings_settings_component__WEBPACK_IMPORTED_MODULE_4__["SettingsComponent"] },
    { path: 'terms', component: _terms_terms_component__WEBPACK_IMPORTED_MODULE_6__["TermsComponent"] },
    { path: 'info', component: _info_info_component__WEBPACK_IMPORTED_MODULE_5__["InfoComponent"] },
    { path: '**', component: _documents_documents_component__WEBPACK_IMPORTED_MODULE_1__["DocumentsComponent"] },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "xD4D":
/*!********************************************!*\
  !*** ./src/app/editor/editor.component.ts ***!
  \********************************************/
/*! exports provided: EditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorComponent", function() { return EditorComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _document_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../document.service */ "2/4T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _editor_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../editor.service */ "jp9u");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../nav/nav.component */ "izVM");









const _c0 = ["editor"];
const SAVE_TIMEOUT_MS = 400;
class EditorComponent {
    constructor(route, editorService, documentService, translate) {
        this.route = route;
        this.editorService = editorService;
        this.documentService = documentService;
        this.translate = translate;
        this.content = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.initEditor = (iso) => {
            if (iso) {
                let initialValue = this.documentService.getDocumentContent(this.id);
                if (initialValue === undefined) {
                    initialValue = _document_service__WEBPACK_IMPORTED_MODULE_2__["DocumentService"].getDefaultDocumentContent();
                    this.documentService.save(initialValue, this.id);
                }
                this.editor = new toastui.Editor(Object.assign({ el: this.$editor.nativeElement, initialValue, language: iso.replace(/\-(.*)/, code => code.toUpperCase()), events: {
                        change: () => this.content.next(this.editor.getMarkdown())
                    } }, this.setEditorOptions()));
                this.content.next(initialValue);
                this.subscription$ = this.content.pipe(
                // wait 1300ms after each keystroke before considering the new content
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(SAVE_TIMEOUT_MS), 
                // ignore new term if same as previous term
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])()).subscribe((content) => this.documentService.save(content, this.id));
            }
        };
    }
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
    ngAfterViewInit() {
        this.editorService.scriptSoruce.subscribe(this.initEditor);
    }
    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
    setEditorOptions() {
        return {
            previewStyle: '',
            height: '100vh',
            toolbarItems: [
                // Using Option: Customize the last button
                {
                    type: 'button',
                    options: {
                        command: 'Strike',
                        className: 'tui-indexed',
                        state: 'strike',
                        tooltip: this.translate.instant('_index_text'),
                    }
                },
                'heading',
                'bold',
                'italic',
                'divider',
                'hr',
                'quote',
                'divider',
                'ul',
                'ol',
                'task',
                'indent',
                'outdent',
                'divider',
                'table',
                'image',
                'link',
                'divider',
                'code',
                'codeblock',
                'divider',
            ],
        };
    }
}
EditorComponent.ɵfac = function EditorComponent_Factory(t) { return new (t || EditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_editor_service__WEBPACK_IMPORTED_MODULE_5__["EditorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_document_service__WEBPACK_IMPORTED_MODULE_2__["DocumentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"])); };
EditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: EditorComponent, selectors: [["app-editor"]], viewQuery: function EditorComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.$editor = _t.first);
    } }, decls: 6, vars: 1, consts: [[1, "editor"], ["editor", ""], [1, "nav-item"], ["title", "Preview Document", "translate", "", 1, "nav-link", "preview-icon", 3, "routerLink"]], template: function EditorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "app-nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "li", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "_preview");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("routerLink", "/view/", ctx.id, "");
    } }, directives: [_nav_nav_component__WEBPACK_IMPORTED_MODULE_7__["NavComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkWithHref"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateDirective"]], styles: ["[_nghost-%COMP%] {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100vh;\r\n}\r\n.preview-icon[_ngcontent-%COMP%] {\r\n    background-image: url('/assets/images/find-in-page.svg');\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0FBQ2pCO0FBQ0E7SUFDSSx3REFBd0Q7QUFDNUQiLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbn1cclxuLnByZXZpZXctaWNvbiB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1hZ2VzL2ZpbmQtaW4tcGFnZS5zdmcnKTtcclxufSJdfQ== */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map