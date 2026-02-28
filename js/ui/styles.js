import { supportOtherSite } from '../core/state.js';

export function injectStyles() {
  const styles = `
      .light .dialog-wrapper{
        color: black !important;
      }
      .dark .dialog-wrapper{
        color: white !important;
      }
      .custom-menu {
        ${ supportOtherSite ? 'z-index: 1;':'z-index: 0;' }
        position: fixed;
        top:65px;
        right:0;
        height:calc(90vh - 65px);
        overflow-y: hidden;
        overflow-x: hidden;
        box-sizing: content-box;
        width:155px !important;
        padding:5px;
        background:rgb(236,236,241);
        border-radius:10px;
        margin-right:8px;
        
        display:flex;
        flex-direction:column !important;

        ${ supportOtherSite ? '':'transition: transform 0.3s ease-in-out;' }
        ${ supportOtherSite ? '':'transform: translateX(0);' }
      }
      @media only screen and (max-width: 980px) {
        .custom-menu {
          top:100px;
          height:calc(85vh - 120px);
        }
      }
      .dark .custom-menu {
        background:gray;
      }
      .hidden-template-buttons .custom-menu{
        transform: translateX(200px);
      }
      .custom-menu .menu-collapse-button{
        display: flex;
        justify-content: center;
        align-items: center;
        height:30px;
      }
      .custom-menu .menu-collapse-button svg{
        width:18px;
        fill:white;
      }
      .dark .custom-menu .menu-collapse-button span{
        color: #ccc;
      }
      .dark .custom-menu .menu-collapse-button svg{
        fill: #ccc;
      }
      .collapse-button {
        position: fixed;
        bottom: 220px;
        right: 10px;
        display:none;
        padding:12px;
        cursor:pointer;
        z-index: 999999;
      }
      @media only screen and (max-width: 980px) {
        .collapse-button {
          right: 0px;
        }
      }
      .collapse-button svg{
        height:22px;
        width:22px;
        fill: #ccc;
      }
      .dark .collapse-button svg{
        fill: #ccc;
      }
      .hidden-template-buttons .collapse-button{
        display:inline-block;
      }
      
      .custom-menu .search-box{
        flex:0 0 30px;
        margin-bottom:5px;
      }
      .custom-menu .search-box .custom-keyword-input {
        display: block;
        width:100%;
        height: 30px;
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 0 1px #f1f1f1;
        border: none;
        padding: 0 10px;
        font-size: 16px;
        color: black;
        outline: none;
        ${ supportOtherSite ? 'width:135px' : 'width:100%' }
      }
      .dark .custom-menu .search-box .custom-keyword-input {
        background-color: black;
        box-shadow: 0 0 1px black;
        color: #ccc;
        font-size:16px;
      }
      .custom-keyword-input::placeholder {
        font-size:14px;
      }
      .custom-menu .prompt-list-area{
        flex:1 1 auto;
        overflow-y: auto;
      }
      .custom-menu .prompt-list-area::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
      .custom-menu .quick-reply-area{
        margin-top:5px;
        flex: 0 0 auto;
        max-height: 380px;
        overflow-y: auto;
      }
      .custom-menu .other-area{
        margin-top:5px;
        flex:0 0 30px;
      }
      .custom-menu .quick-reply-area::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
      .custom-menu .quick-reply-area .custom-template-buttons:last-child {
        margin:0 !important;
      }
      .dialog-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99999;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .dialog {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          padding: 20px 20px 0px 20px;
          width: 100%;
      }
      .dialog #questionPreviewArea {
        max-height:200px;
        overflow:auto;
        font-size: 18px;
      }
      .question-textarea {
          width: 100%;
          height: 427px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 5px;
          font-size: 18px !important;
          line-height: 1.5;
          resize: vertical;
          margin-top: 20px;
          color:black;
          box-sizing: border-box;
      }
      .quickReplyMessage{
        border-radius: 3px;
      }
      .dialog button {
          border: none;
          border-radius: 3px;
          padding: 10px 15px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-right: 10px;
      }
      .footer {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding:20px 0px;
      }
      .footer .super-sun-o-pt {
        position: absolute;
        right: 0;
      }
      .footer .fixed-left {
        position: absolute;
        left: 0;
      }
      .footer #dialog7-edit {
        position: absolute;
        left: 0;
      }
      .footer #dialog-edit {
        position: absolute;
        left: 0;
      }
      button.primary {
          background-color: #9a8e81;
          color: #fff;
      }
      button.secondary {
          background-color: #c3bda9;
          color: #fff;
      }
      button.success {
          background-color: #7f9a87;
          color: #fff;
      }
      button.info {
          background-color: #5A7DAB;
          color: #fff;
      }
      button.warning {
          background-color: hsl(267, 30%, 55%);
          color: #fff;
      }
      button.light{
        background-color: #9ca3af;
        color: white;
      }
      .dark button.light{
        background-color: rgba(64,65,79,1) !important;
        color: #d1d5db;
      }
      .dark button.primary {
        background-color: #5a5646;
        color: #d1d5db !important;
      }
      .dark button.secondary {
          background-color: #7a7363;
          color: #d1d5db !important;
      }
      .dark button.success {
          background-color: #4f6654;
          color: #d1d5db !important;
      }
      .dark button.info {
          background-color: #3A5276;
          color: #d1d5db !important;
      }
      .dark button.warning {
        background-color: hsl(267, 30%, 40%);
        color: #d1d5db !important;
      }
      .center {
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .my-table {
          width: 100%;
          border-collapse: collapse;
      }
      .my-table th{
          border: 1px solid #ccc;
          padding: 8px 12px;
          color:black;
      }
      .my-table td {
          border: 1px solid #ccc;
          padding: 8px 12px;
          color:black;
      }
      .my-table th {
          background-color: #f2f2f2;
          font-weight: bold;
          text-align: center;
      }
      .my-table td {
          text-align: left;
      }
      .my-table input[type="text"] {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          color:black;
      }
      .superPromptCategoryNameInput{
        width:100%;
        padding: 6px 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        color:black;
        margin:5px 0px;
      }
      .shortcut-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #333;
          border-radius: 4px;
          padding: 8px 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          margin:auto;
      }
      .shortcut-content {
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
      }
      #dialog3 .shortcut-wrapper{
          height:44px;
      }
      #dialog3 .shortcut-content {
          font-size: 18px;
      }
      #dialog3 .my-table th {
        font-size: 22px;
        font-weight: 500;
      }
      #dialog3 .my-table td {
        font-size: 22px;
        font-weight: 500;
      }    
      .dark .dialog{
          background-color: rgba(68,70,84,1);
      }
      .dark .dialog #questionPreviewArea{
          font-size: 18px;
          color: #d1d5db !important;
      }
      .dark .dialog textarea {
          padding: 10px;
          background-color: rgba(32,33,35,1);
          color: #d1d5db !important;
      }
      .dark .dialog select {
        background-color: rgba(32,33,35,1);
        color: #d1d5db !important;
    }
      .dark .my-table th{
          background-color: rgba(236,236,241,.2);
      }
      .dark .my-table td{
          background-color: rgba(68,70,84,1);
      }
      .dark .my-table input[type="text"] {
          background-color: rgba(32,33,35,1);
          color: #d1d5db !important;
      }
      .dark .superPromptCategoryNameInput {
        background-color: rgba(32,33,35,1);
        color: #d1d5db !important;
      }
      .dark .shortcut-content {
          color: #d1d5db !important;
      }
      .ellipsis {
          width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      }
      .dark .ellipsis {
          color: #d1d5db !important;
      }
      #dialog2 .my-table textarea{
          width: 100%;
          height: 85px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 5px;
          line-height: 1.5;
          color:black;
      }
      
      .slide-checkbox {
        width: 80px;
        height: 26px;
        background: #333;
        margin: 20px auto;
        position: relative;
        border-radius: 50px;
        box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
      }
      
      .slide-checkbox:after {
        content: 'OFF';
        color: #000;
        position: absolute;
        right: 10px;
        z-index: 0;
        font: 12px/26px Arial, sans-serif;
        font-weight: bold;
        text-shadow: 1px 1px 0px rgba(255,255,255,.15);
      }
      .slide-checkbox:before {
        content: 'ON';
        color: #27ae60;
        position: absolute;
        left: 10px;
        z-index: 0;
        font: 12px/26px Arial, sans-serif;
        font-weight: bold;
      }
      .slide-checkbox label {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      .slide-checkbox label span {
        display: block;
        width: 34px;
        height: 20px;
        position: absolute;
        top: 3px;
        left: 3px;
        background: #fcfff4;
        background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
        border-radius: 50px;
        transition: all 0.4s ease;
        box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3);
      }
      .slide-checkbox input[type=checkbox] {
        visibility: hidden;
      }
      .slide-checkbox input[type=checkbox]:checked + label span {
        left: 43px;
      }
      #dialog6 .my-table textarea{
        width: 100%;
        height: 85px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 5px;
        line-height: 1.5;
        color:black;
      }
      .super-prompt-preview-area{
        max-height:165px;
        overflow:auto;
        font-size: 18px;
        margin-bottom:5px;
      }
      .super-prompt-table-wrapper{
        max-height:500px;
        overflow:auto;
        font-size: 18px;
        padding-right:5px;
      }
      .super-prompt-table-wrapper .fieldItem{
        padding-bottom:8px;
      }
      .super-prompt-table-wrapper .fieldItem .superPromptName{
        padding-bottom:2px;
      }
      .super-prompt-text {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 5px;
        font-size: 18px !important;
        line-height: 1.5;
        resize: vertical;
        color:black;
      }
      .super-prompt-text::-webkit-input-placeholder {
        opacity: 0.5;
      }

      .super-prompt-text:-ms-input-placeholder {
        opacity: 0.5;
      }

      .super-prompt-text::-ms-input-placeholder {
        opacity: 0.5;
      }
      .dialog-title {
        width: 100%;
        text-align: center;
        color: black;
        margin-top: -20px;
        font-size: 25px;
        padding: 10px;
        color:black;
        
        overflow: hidden; 
        text-overflow: ellipsis; 
        white-space: nowrap;
      }
      .dark .dialog-title{
        color: #d1d5db !important;
      }
      .chatgpt-dropdown {
        position: relative;
        display: inline-block;
      }

      .chatgpt-dropdown-btn {
        background-color: #ffffff;
        color: #333;
        border: none;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
      }
      .dark .chatgpt-dropdown-btn {
        background-color: rgba(5,5,9,1);
        color: #ececec;
      }
      
      .chatgpt-dropdown-content {
        position: absolute;
        top: 100%;
        left: -10px;
        z-index: 1;
        display: none;
        min-width: 160px;
        background-color: #ffffff;
        border: none;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index:999;
        width:240px;
      }
      .dark .chatgpt-dropdown-content {
        background-color: rgba(5,5,9,1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      .chatgpt-dropdown-content a {
        color: #333;
        padding: 15px;
        text-decoration: none;
        display: block;
        cursor: pointer;
        font-size:15px;
      }
      .dark .chatgpt-dropdown-content a {
        color: white;
      }
      .chatgpt-dropdown-content a:hover {
        background-color: #ececec;
      }
      .dark .chatgpt-dropdown-content a:hover {
        background-color: rgba(64,65,79,1);
      }
      .chatgpt-dropdown-todo:hover .chatgpt-dropdown-content {
        display: block;
      }
      .chatgpt-dropdown-content.show {
        display: block;
        border: 1px solid #e0e0e0;
      }
      .dark .chatgpt-dropdown-content.show {
        border: 1px solid rgba(64,65,79,1);
      }
      .chatgpt-dropdown-up .chatgpt-dropdown-content {
        top: auto;
        bottom: 100%;
      }
      .chatgpt-dropdown-up .chatgpt-dropdown-btn {
        border-radius: 5px 5px 0 0;
      }
      .table-container {
        width: 100%;
        overflow-y: auto;
        max-height: 552px;
        border-bottom: 1px solid #ccc;
        padding-right:4px;
      }
      .scroll-table-form {
        width: 100%;
        border-collapse: collapse;
        margin:0px;
      }
      .scroll-table-form thead tr {
        position: sticky;
        top: 0;
        z-index:999;
      }
      .dark .scroll-table-form thead th {
        background-color: #757575;
      }
      .dark .super-prompt-id{
        color: #d1d5db !important;
        font-size:16px;
      }   
      .super-prompt-category-name-list{
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 每列 5 個欄位 */
        grid-gap: 10px; /* 欄位間的間距 */
        width:100%;
        margin-bottom:10px;
      }   
      .super-prompt-category-name-list input{ margin:0px;}
      .expand-edit-prompt{
        fill: black;
        width:20px;
        height:20px;
        margin-right:-10px;
        transform: rotate(90deg);
        cursor:pointer;
      }
      .dark .expand-edit-prompt{
        fill:#d1d5db;
      }
      .dark .drag-btn{
        color:#d1d5db;
      }
      .drag-over {
        border-top: 2px solid blue;
        padding-top: 10px;
      }
      .drag-over-bottom {
        border-bottom: 2px solid blue;
        padding-bottom: 10px;
      }
      .dragging-row {
        opacity: 0.5;
      }
      .custom-hover:hover{
        background-color: #cdcdcd;
        ;
      }
      .dark .custom-hover:hover{
        background-color: #202123;
      }
      .customMenuItem{
        position: relative;
        z-index: 1;
        background-color: var(--sidebar-surface-primary, #f9f9f9);
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
      }
      .customMenuItem:first-of-type{
        margin-top: -1px;
        padding-top: calc(0.75rem + 1px);
      }
      div:has(+ div .customMenuItem) .bg-token-border-sharp {
        display: none !important;
      }
      .custom-icon{
        fill: black;
      }
      .dark .custom-icon{
        fill: white;
      }
      #pinkoi-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #f8d7d9, #eec8cc); /* Pinkoi 粉色漸層 */
        color: #5c5c5c; /* 深灰色文字，與 Pinkoi 配色一致 */
        text-decoration: none;
        padding: 10px 10px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        gap: 10px;
        width: 150px;
      }
      #pinkoi-button:hover {
        background: linear-gradient(45deg, #eec8cc, #d9b6b9); /* 加深粉色漸層，符合 Pinkoi 點擊效果 */
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
      }
      #fb-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #1877f2, #155bc1); /* Facebook 藍色漸層 */
        color: #ffffff; /* 白色文字，與 Facebook 配色一致 */
        text-decoration: none;
        padding: 10px 10px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        gap: 10px;
        width: 150px;
      }
      #fb-button:hover {
        background: linear-gradient(45deg, #155bc1, #0d3f91); /* 加深藍色漸層，符合 Facebook 點擊效果 */
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
      }
      #line-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #4caf50, #43a047); /* 深綠到淺綠漸層 */
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        gap: 10px;
        width: 168px;
      }
      #line-button:hover {
        background: linear-gradient(45deg, #388e3c, #2e7d32); /* hover 時再深一點 */
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      #prompt-packs-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045); /* IG 風格漸層 */
        color: #ffffff; /* 保持白色文字 */
        text-decoration: none;
        padding: 10px 10px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        gap: 10px;
        width: 165px;
      }
      #prompt-packs-button:hover {
        background: linear-gradient(45deg, #702f91, #e51414, #d89a37); /* 略微降低亮度的漸層 */
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      #threads-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000; /* Threads 主色調黑色 */
        color: #ffffff; /* 白色文字 */
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        gap: 10px;
        width: 150px;
      }
      #threads-button:hover {
        background: #333333; /* 提供更淺的黑色作為 hover 效果 */
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
}
