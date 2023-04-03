(function () {
  "use strict";

  // 系統判別 && 主按鍵 && 按鍵文字
  const userAgent = navigator.userAgent;

  const isMac = userAgent.indexOf("Mac") !== -1;

  const mainKey = isMac ? "ctrlKey" : "altKey";
  const mainKeyText = isMac ? "control" : "alt";

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // css style
  const styles = `
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
          padding: 20px;
          width: 100%;
      }

      .dialog #questionPreviewArea {
        max-height:280px;
        overflow:auto;
        font-size: 18px;
      }

      .question-textarea {
          width: 100%;
          height: 250px;
          border: 1px solid #ccc;
          border-radius: 3px;
          padding: 5px;
          font-size: 18px !important;
          line-height: 1.5;
          resize: vertical;
          margin-top: 20px;
          margin-bottom: 20px;
          color:black;
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
      }
      .footer #dialog2-reset {
          position: absolute;
          right: 10px;
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
      .center {
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .my-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
      }
      .my-table th, td {
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
      #dialog3 .my-table th, td {
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
      .dark .shortcut-content {
          color: #d1d5db !important;
      }
      .show-template-buttons .custom-template-buttons{
          display: none;
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
      .custom-menu {
        position: fixed;
        top:50px;
        right:2px;
        padding-right:4px;
        z-index: 1000;
        height:90vh;
        width:175px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      `;

  // 插入 style
  const styleEl = document.createElement("style");
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // 提問視窗 HTML
  const dialogHTML = `
      <div id="dialog" class="dialog-wrapper" style="display;none">
          <div class="dialog" style="max-width: 850px;">
              <div id="questionPreviewArea"></div>
              <textarea id="dialog-textarea" class="question-textarea" tabindex="1" placeholder="請輸入問題 (輸入完成後，按下 Enter，即可送出)"></textarea>
              <div class="center">
                  <button id="dialog-ok" class="primary" tabindex="2">送出 ( ${mainKeyText} + s )</button>
                  <button id="dialog-cancel" class="secondary" tabindex="3">取消 ( esc )</button>
              </div>
          </div>
      </div>
  `;

  // 設定模版的表單視窗 HTML
  const formDialogHTML = `
    <div id="dialog2" class="dialog-wrapper" style="display:none">

      <div class="dialog" style="max-width: 95%;">

        <table id="table-form" class="my-table">
          <tr>
            <th style="width:118px">組合鍵</th>
            <th style="width:200px">按鈕名稱</th>
            <th>前段文字</th>
            <th>後段文字</th>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 1 </span>
              </div>
            </td>
            <td><input tabindex="1" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="2" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="3" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 2 </span>
              </div>
            </td>
            <td><input tabindex="4" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="5" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="6" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 3 </span>
              </div>
            </td>
            <td><input tabindex="7" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="8" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="9" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 4 </span>
              </div>
            </td>
            <td><input tabindex="10" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="11" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="12" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 5 </span>
              </div>
            </td>
            <td><input tabindex="13" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="14" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="15" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

        </table>

        <table id="table-form2" class="my-table" style="width:100%">
          <tr>
            <th style="width:118px">組合鍵</th>
            <th style="width:200px">按鈕名稱</th>
            <th>前段文字</th>
            <th>後段文字</th>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 6 </span>
              </div>
            </td>
            <td><input tabindex="1" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="2" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="3" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 7 </span>
              </div>
            </td>
            <td><input tabindex="4" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="5" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="6" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 8 </span>
              </div>
            </td>
            <td><input tabindex="7" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="8" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="9" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 9 </span>
              </div>
            </td>
            <td><input tabindex="10" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="11" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="12" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="shortcut-wrapper">
                <span class="shortcut-content"> ${capitalizeFirstLetter(
                  mainKeyText
                )} + 0 </span>
              </div>
            </td>
            <td><input tabindex="13" class="btnTextInput" type="text" placeholder="輸入框"></td>
            <td>
              <div class="center">
                <textarea tabindex="14" class="prefixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
            <td>
              <div class="center">
                <textarea tabindex="15" class="suffixInput" placeholder="輸入框"></textarea>
              </div>
            </td>
          </tr>
          
        </table>

        <div class="footer" class="center">
          <button tabindex="16" id="dialog2-ok" class="primary">儲存設定 ( ${mainKeyText} + s )</button>
          <button tabindex="17" id="dialog2-cancel" class="secondary">取消 ( esc ) </button>
          <button tabindex="18" id="dialog2-reset" class="success">恢復預設值 ( ${mainKeyText} + e )</button>
        </div>

      </div>

    </div>
    `;

  // 快捷鍵提示視窗 HTML
  const keyboardShortcutHTML = `
  <div id="dialog3" class="dialog-wrapper" style="display;none">
  <div class="dialog" style="max-width:1300px">
    <table style="width:100%">

      <tr>
        <td>
        <div class="shortcut-wrapper">
          <span class="shortcut-content"> ${capitalizeFirstLetter(
            mainKeyText
          )} + Z </span>
        </div>
        </td>
        <td>
          <div class="ellipsis">提示快捷鍵</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ESC </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">關閉視窗</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${
              isMac ? "Control" : "Ctrl"
            } + Shift </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">轉換 3.5 / 4.0</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + A </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">顯示或隱藏右側選單</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + S </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">儲存 (開啟視窗時)</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + E </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">恢復預設值</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + D </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> 切換 Dark Mode </div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + W </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">開啟設定視窗</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + S </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">開啟設定視窗2</div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + N </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> 新開 Chat </div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 1 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 6 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + M </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">切換 Model 的選單</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 2 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 7 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + C </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">繼續對話</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 3 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 8 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + X </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">取消對話</div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 4 </span>
          </div>
        </td>
        <td>
          <duv class="templateButtonText ellipsis"></duv>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 9 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + R </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> 重新回應 </div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 5 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + 0 </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + G </span>
          </div>
        </td>
        <td>
          <div class="ellipsis"> 開啟快速回覆設定視窗 </div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + Y </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + U </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

      <tr>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + I </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + O </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
        <td>
          <div class="shortcut-wrapper">
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + P </span>
          </div>
        </td>
        <td>
          <div class="templateButtonText ellipsis"></div>
        </td>
      </tr>

    </table>
  </div>
</div>
  `;

  // 快速回覆 HTML
  const quickReplyHTML = `
  <div id="dialog4" class="dialog-wrapper" style="display:none">

    <div class="dialog" style="max-width: 60%;">

      <table class="my-table" style="width:100%">

        <tr>
          <th style="width:118px">組合鍵</th>
          <th style="width:200px">按鈕名稱</th>
          <th>快速回覆的文字</th>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + Y </span>
            </div>
          </td>
          <td><input tabindex="1" class="quickReplyButtonText" type="text" placeholder="輸入框"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="2" class="quickReplyMessage" placeholder="輸入框"></textarea>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + U </span>
            </div>
          </td>
          <td><input tabindex="3" class="quickReplyButtonText" type="text" placeholder="輸入框"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="4" class="quickReplyMessage" placeholder="輸入框"></textarea>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + I </span>
            </div>
          </td>
          <td><input tabindex="5" class="quickReplyButtonText" type="text" placeholder="輸入框"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="6" class="quickReplyMessage" placeholder="輸入框"></textarea>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + O </span>
            </div>
          </td>
          <td><input tabindex="7" class="quickReplyButtonText" type="text" placeholder="輸入框"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="8" class="quickReplyMessage" placeholder="輸入框"></textarea>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="shortcut-wrapper">
              <span class="shortcut-content"> ${capitalizeFirstLetter(
                mainKeyText
              )} + P </span>
            </div>
          </td>
          <td><input tabindex="9" class="quickReplyButtonText" type="text" placeholder="輸入框"></td>
          <td>
            <div class="center">
              <textarea style="width:100%" tabindex="10" class="quickReplyMessage" placeholder="輸入框"></textarea>
            </div>
          </td>
        </tr>
      
      </table>

      <div class="footer" class="center">
        <button tabindex="11" id="dialog4-ok" class="primary">儲存設定 ( ${mainKeyText} + s )</button>
        <button tabindex="12" id="dialog4-cancel" class="secondary">取消 ( esc ) </button>
        <button tabindex="13" id="dialog4-reset" class="success">恢復預設值 ( ${mainKeyText} + e )</button>
      </div>
  </div>

</div>  
  `;

  // 插入 HTML 元素
  const dialogEl = document.createElement("div");
  dialogEl.innerHTML = dialogHTML;
  document.body.appendChild(dialogEl);

  const formDialogEl = document.createElement("div");
  formDialogEl.innerHTML = formDialogHTML;
  document.body.appendChild(formDialogEl);

  const keyboardShortDialogEl = document.createElement("div");
  keyboardShortDialogEl.innerHTML = keyboardShortcutHTML;
  document.body.appendChild(keyboardShortDialogEl);

  const quickReplySettingsDialogEl = document.createElement("div");
  quickReplySettingsDialogEl.innerHTML = quickReplyHTML;
  document.body.appendChild(quickReplySettingsDialogEl);

  // Question
  const questionDialog = document.getElementById("dialog");
  const questionPreviewAreaDiv = document.getElementById("questionPreviewArea");
  const questionDialogTextarea = document.querySelector("#dialog-textarea");
  const questionDialogOkBtn = document.querySelector("#dialog-ok");
  const questionDialogCancelBtn = document.querySelector("#dialog-cancel");

  let prefix = "";
  let suffix = "";

  // Settings
  const settingsDialog = document.getElementById("dialog2");
  const settingsDialogOkBtn = document.querySelector("#dialog2-ok");
  const settingsDialogCancelBtn = document.querySelector("#dialog2-cancel");
  const settingsDialogResetBtn = document.querySelector("#dialog2-reset");
  const settingsTableForm = settingsDialog.querySelector("#table-form");
  const settingsTableForm2 = settingsDialog.querySelector("#table-form2");

  // Shortcut Key Hint
  const shortcutKeyHintDialog = document.getElementById("dialog3");

  // quickReply
  const quickReplySettingsDialog = document.getElementById("dialog4");
  const quickReplySettingsDialogOkBtn = document.querySelector("#dialog4-ok");
  const quickReplySettingsDialogCancelBtn =
    document.querySelector("#dialog4-cancel");
  const quickReplySettingsDialogResetBtn =
    document.querySelector("#dialog4-reset");

  // other
  let intervalID = null;
  let modeBtn = null;

  let isComposing = false;

  /** 1:form or 2:form2 */
  let currentSettingFormType;

  // dataList / quickReply
  let dataList = [];

  const defaultDataList = [
    {
      text: "自由提問",
      prefix: "",
      suffix: "，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "英文解釋",
      prefix: "你現在是一個英文教育專家，請解釋英文單字 [",
      suffix: "]，拼音、詞性，並給出 5 個中英文的範例。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "多國語系翻譯",
      prefix: "你現在是一個翻譯專家，請幫我翻譯 [",
      suffix:
        "] 的繁體中文、簡體中文、英文、日文，\n並請使用表格顯示，表頭分別為 zh-tw、zh-cn、en、ja，\n不需要其他解釋或說明。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "程式問題",
      prefix: "你現在是一個 Angular、RxJs、Typescript、Javascript 專家，\n",
      suffix: "\n，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "CSS 範例",
      prefix: "你現在是一個 CSS 專家，請幫我做出以下敘述的樣式：\n",
      suffix: "\n，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "整理重點",
      prefix:
        "你現在是個閱讀專家，請幫我整理下面文章的重點，使用條列方式，列出 10 點，最後給出一個總結：\n\n",
      suffix: "\n\n，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "研究報告",
      prefix: "寫一篇有關",
      suffix:
        "的 300 字研究報告，報告中需引述最新的研究，並引用專家觀點，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "文字修飾",
      prefix: "請幫我修飾以下敘述，符合台灣用語，且輕鬆活潑。\n\n",
      suffix: "",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "問題建議",
      prefix: "我遇到以下問題：\n",
      suffix: "\n請幫我想出解決方式或替代方案，並使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "登山建議",
      prefix: "你現在是一個登山專家，我近期打算去爬",
      suffix:
        "，請使用繁體中文回答，回答需包括以下內容：\n1. 登山難度及時間\n2. 交通資訊\n3. 景點氣候特性\n4. 其他補充",
      buttonElement: null,
      handleClickFn: null,
    },
  ];

  let defaultQuickReplyMessageList = [
    {
      text: "提供其它範例",
      quickReplyMessage: "請提供其它範例",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "更詳細的說明",
      quickReplyMessage: "請提供更細節的說明",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "提供程式範例",
      quickReplyMessage: "請提供程式範例",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "翻譯成繁體中文",
      quickReplyMessage: "請翻譯成繁體中文",
      buttonElement: null,
      handleClickFn: null,
    },
    {
      text: "翻譯成英文",
      quickReplyMessage: "請翻譯成英文",
      buttonElement: null,
      handleClickFn: null,
    },
  ];

  let quickReplyMessageList = [];

  // 初始化
  function init() {
    questionDialog.style.display = "none";
    settingsDialog.style.display = "none";
    shortcutKeyHintDialog.style.display = "none";

    if (!localStorage.getItem("Custom.Template.Settings")) {
      localStorage.setItem(
        "Custom.Template.Settings",
        JSON.stringify(defaultDataList)
      );
    }

    if (!localStorage.getItem("Custom.Template.QuickReply")) {
      localStorage.setItem(
        "Custom.Template.QuickReply",
        JSON.stringify(defaultQuickReplyMessageList)
      );
    }

    if (!localStorage.getItem("Custom.Template.Buttons.Show")) {
      localStorage.setItem("Custom.Template.Buttons.Show", JSON.stringify("Y"));
    }

    localStorage.getItem("Custom.Template.Buttons.Show") === "Y"
      ? document.body.classList.add("show-template-buttons")
      : document.body.classList.remove("show-template-buttons");

    dataList = JSON.parse(localStorage.getItem("Custom.Template.Settings"));

    quickReplyMessageList = JSON.parse(
      localStorage.getItem("Custom.Template.QuickReply")
    );
  }
  init();

  function findModeBtn() {
    intervalID = setInterval(function () {
      if (document.querySelector("[data-headlessui-state]")) {
        modeBtn = document.querySelector("[data-headlessui-state]");
        clearInterval(intervalID);
      }
    }, 200);
  }

  findModeBtn();

  function findModeOptionAndClick(index) {
    clearInterval(intervalID);
    intervalID = setInterval(function () {
      if (document.querySelectorAll('[role="option"]')) {
        const option = document.querySelectorAll('[role="option"]')[index];
        option?.click();
        clearInterval(intervalID);
      }
    }, 200);
  }

  function darkModeToggle() {
    document.querySelectorAll("nav").forEach((nav) => {
      nav.querySelectorAll("a").forEach((a) => {
        if (a.text === "Light mode" || a.text === "Dark mode") {
          a.click();
        }
      });
    });
  }

  // ------------ shortcutKey event handle ------------
  document.addEventListener("keydown", function (event) {
    // z 或 mainKey : 關閉 快捷鍵視窗
    if (
      (shortcutKeyHintDialog.style.display === "flex" &&
        event.key.toLocaleLowerCase() === "z") ||
      (shortcutKeyHintDialog.style.display === "flex" && event[mainKey])
    ) {
      shortcutKeyHintDialog.style.display = "none";
      return;
    }

    // esc : close questionDialog
    if (
      !isComposing &&
      questionDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      questionDialog.style.display = "none";
      return;
    }

    // esc : close settingsDialog
    if (
      !isComposing &&
      settingsDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      settingsDialog.style.display = "none";
      return;
    }

    // esc : close quickReplySettingsDialog
    if (
      !isComposing &&
      quickReplySettingsDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      quickReplySettingsDialog.style.display = "none";
      return;
    }

    // mainKey + w : open settingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "w"
    ) {
      event.preventDefault();
      showSettingsDialog(1);
      return;
    }

    // mainKey + s : open settingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      showSettingsDialog(2);
      return;
    }

    // mainKey + g : open quickReplySettingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "g"
    ) {
      event.preventDefault();
      showQuickReplySettingsDialog();
      return;
    }

    // mainKey + s : send message
    if (
      questionDialogTextarea.value.trim() &&
      questionDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      questionDialog.style.display = "none";
      sendQuestionForm();
      return;
    }

    // mainKey + s : save settings
    if (
      settingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      saveSittings();
      return;
    }

    // mainKey + s : save quickReplySettingsDialog
    if (
      quickReplySettingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      saveQuickReplySettings();
      return;
    }

    // mainKey + e : reset form value
    if (
      settingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "e"
    ) {
      event.preventDefault();
      resetFormValue();
      return;
    }

    // mainKey + e : reset quickRelySettings form value
    if (
      quickReplySettingsDialog.style.display === "flex" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "e"
    ) {
      event.preventDefault();
      resetQuickReplyFormValue();
      return;
    }

    // mainKey + r : regenerate response
    if (
      settingsDialog.style.display === "none" &&
      questionDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "r"
    ) {
      event.preventDefault();
      document.querySelectorAll("button").forEach((button) => {
        if (button.textContent === "Regenerate response") {
          button.click();
        }
      });
      return;
    }

    // mainKey + x : stop
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "x"
    ) {
      event.preventDefault();
      document.querySelectorAll("button").forEach((button) => {
        if (button.textContent === "Stop generating") {
          button.click();
        }
      });
      return;
    }

    // mainKey + c : continue
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "c"
    ) {
      event.preventDefault();
      sendMessage("繼續");
      return;
    }

    // mainKey + y : custom quick reply
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "y"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[0].quickReplyMessage) {
        sendMessage(quickReplyMessageList[0].quickReplyMessage);
      }
      return;
    }

    // mainKey + u : custom quick reply 2
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "u"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[1].quickReplyMessage) {
        sendMessage(quickReplyMessageList[1].quickReplyMessage);
      }
      return;
    }

    // mainKey + i : custom quick reply 3
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "i"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[2].quickReplyMessage) {
        sendMessage(quickReplyMessageList[2].quickReplyMessage);
      }
      return;
    }

    // mainKey + o : custom quick reply 4
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "o"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[3].quickReplyMessage) {
        sendMessage(quickReplyMessageList[3].quickReplyMessage);
      }
      return;
    }

    // mainKey + p : custom quick  5
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "p"
    ) {
      event.preventDefault();
      if (quickReplyMessageList[4].quickReplyMessage) {
        sendMessage(quickReplyMessageList[4].quickReplyMessage);
      }
      return;
    }

    // mainKey + d : dark mode toggle
    if (event[mainKey] && event.key.toLocaleLowerCase() === "d") {
      event.preventDefault();
      darkModeToggle();
      return;
    }

    // mainKey + a : show / hidden right buttons
    if (event[mainKey] && event.key.toLocaleLowerCase() === "a") {
      event.preventDefault();

      if (localStorage.getItem("Custom.Template.Buttons.Show") === "Y") {
        localStorage.setItem("Custom.Template.Buttons.Show", "N");
        document.body.classList.remove("show-template-buttons");
      } else {
        localStorage.setItem("Custom.Template.Buttons.Show", "Y");
        document.body.classList.add("show-template-buttons");
      }

      return;
    }

    // control + shift : change to gpt-4 or gpt-3.5 (url)
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const url = new URL(window.location.href);
      const urlSearchParams = new URLSearchParams(url.search);
      const model = urlSearchParams.get("model")
        ? urlSearchParams.get("model")
        : "text-davinci-002-render-sha";
      if (model === "text-davinci-002-render-sha") {
        window.location.href = "https://chat.openai.com/chat?model=gpt-4";
      } else {
        window.location.href =
          "https://chat.openai.com/chat?model=text-davinci-002-render-sha";
      }
      return;
    }

    // mainKey + n： new chat
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "n"
    ) {
      event.preventDefault();

      const newChatBtn = document.querySelector("nav").children[0];

      newChatBtn.click();
      findModeBtn();
      return;
    }

    // mainKey + m : change to gpt-4 or gpt-3.5 toggle button
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "m"
    ) {
      event.preventDefault();

      const url = new URL(window.location.href);

      const urlSearchParams = new URLSearchParams(url.search);

      const model = urlSearchParams.get("model")
        ? urlSearchParams.get("model")
        : "text-davinci-002-render-sha";

      if (!modeBtn) {
        return;
      }

      modeBtn.click();

      if (model === "text-davinci-002-render-sha") {
        findModeOptionAndClick(2);
      } else {
        findModeOptionAndClick(0);
      }

      return;
    }

    // mainKey + 1 ~ 0 number keyboard : open question dialog
    if (
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      event[mainKey]
    ) {
      switch (event.key) {
        case "1":
          event.preventDefault();
          dataList[0].buttonElement.click();
          break;

        case "2":
          event.preventDefault();
          dataList[1].buttonElement.click();
          break;

        case "3":
          event.preventDefault();
          dataList[2].buttonElement.click();
          break;

        case "4":
          event.preventDefault();
          dataList[3].buttonElement.click();
          break;

        case "5":
          event.preventDefault();
          dataList[4].buttonElement.click();
          break;

        case "6":
          event.preventDefault();
          dataList[5].buttonElement.click();
          break;

        case "7":
          event.preventDefault();
          dataList[6].buttonElement.click();
          break;

        case "8":
          event.preventDefault();
          dataList[7].buttonElement.click();
          break;

        case "9":
          event.preventDefault();
          dataList[8].buttonElement.click();
          break;

        case "0":
          event.preventDefault();
          dataList[9].buttonElement.click();
          break;

        default:
          break;
      }
    }
  });

  // ------------ 提問視窗 相關程式碼 ------------
  function sendMessage(message) {
    modeBtn = null;
    let isGenerating = false;

    // 看看是不是正在對話，若有則先停止
    document.querySelectorAll("button").forEach((button) => {
      if (button.textContent === "Stop generating") {
        isGenerating = true;
        button.click();
      }
    });

    const chatInput = document.querySelector("form").querySelector("textarea");
    const sendButton = document
      .querySelector("form")
      .querySelector(".absolute.p-1.rounded-md.text-gray-500.right-1");

    if (!chatInput) {
      alert("找不到 chatGPT 的 輸入框！");
      return;
    }

    if (!sendButton) {
      alert("找不到 chatGPT 的 送出按鈕！");
      return;
    }

    if (sendButton.disabled) {
      sendButton.disabled = false;
    }

    if (isGenerating) {
      setTimeout(() => {
        chatInput.value = message;
        sendButton.click();
      }, 500);
    } else {
      chatInput.value = message;
      sendButton.click();
    }
  }

  function sendQuestionForm() {
    const message = `${prefix}${questionDialogTextarea.value}${suffix}`;
    questionDialog.style.display = "none";
    sendMessage(message);
  }

  questionDialogTextarea.addEventListener("keydown", function (event) {
    // prevent submitting blank on enter
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      questionDialogTextarea.value.trim() === ""
    ) {
      event.preventDefault();
      return;
    }

    // enter : send
    if (
      !isComposing &&
      !event.shiftKey &&
      document.activeElement === questionDialogTextarea &&
      event.key === "Enter"
    ) {
      sendQuestionForm();
      return;
    }

    // esc : close
    if (
      !isComposing &&
      event.target !== document.activeElement &&
      event.key === "Escape"
    ) {
      questionDialog.style.display = "none";
      return;
    }
  });

  questionDialogOkBtn.addEventListener("click", () => {
    if (questionDialogTextarea.value.trim() === "") {
      return;
    }
    questionDialog.style.display = "none";
    sendQuestionForm();
  });

  questionDialogCancelBtn.addEventListener("click", () => {
    questionDialog.style.display = "none";
  });

  // ------------ 設定視窗相關 程式碼 ------------
  function showSettingsDialog(formType) {
    currentSettingFormType = formType;

    settingsDialog.style.display = "flex";

    settingsTableForm.style.display = "none";
    settingsTableForm2.style.display = "none";

    if (currentSettingFormType === 1) {
      settingsTableForm.style.display = "table";
      settingsTableForm.style.width = "100%";
    } else {
      settingsTableForm2.style.display = "table";
      settingsTableForm2.style.width = "100%";
    }

    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");

    let startIndex = 0;
    let endIndex = 5;

    if (formType == 2) {
      startIndex = 5;
      endIndex = 10;
    }

    for (let index = startIndex; index < endIndex; index++) {
      btnTextInputElements[index].value = dataList[index].text;
      prefixInputElements[index].value = dataList[index].prefix;
      suffixInputElements[index].value = dataList[index].suffix;
    }

    currentSettingFormType === 1
      ? btnTextInputElements[0].focus()
      : btnTextInputElements[5].focus();
  }

  function saveSittings() {
    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");

    let startIndex = 0;
    let endIndex = 5;

    if (currentSettingFormType == 2) {
      startIndex = 5;
      endIndex = 10;
    }

    for (let index = startIndex; index < endIndex; index++) {
      dataList[index].text = btnTextInputElements[index].value;
      dataList[index].prefix = prefixInputElements[index].value;
      dataList[index].suffix = suffixInputElements[index].value;

      dataList[index].buttonElement.removeEventListener(
        "click",
        dataList[index].handleClickFn
      );
      dataList[index].buttonElement.remove();

      delete dataList[index].buttonElement;
      delete dataList[index].handleClickFn;
    }

    localStorage.setItem("Custom.Template.Settings", JSON.stringify(dataList));

    generateButtons();

    settingsDialog.style.display = "none";
  }

  settingsDialogOkBtn.addEventListener("click", () => {
    saveSittings();
  });

  settingsDialogCancelBtn.addEventListener("click", () => {
    settingsDialog.style.display = "none";
  });

  function resetFormValue() {
    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");

    let startIndex = 0;
    let endIndex = 5;

    if (currentSettingFormType == 2) {
      startIndex = 5;
      endIndex = 10;
    }

    for (let index = startIndex; index < endIndex; index++) {
      btnTextInputElements[index].value = defaultDataList[index].text;
      prefixInputElements[index].value = defaultDataList[index].prefix;
      suffixInputElements[index].value = defaultDataList[index].suffix;
    }
  }

  settingsDialogResetBtn.addEventListener("click", () => {
    resetFormValue();
  });

  // ------------ 快速回覆設定視窗 ------------
  function showQuickReplySettingsDialog() {
    quickReplySettingsDialog.style.display = "flex";

    const quickReplyButtonTextElements = document.querySelectorAll(
      ".quickReplyButtonText"
    );
    const quickReplyMessageElements =
      document.querySelectorAll(".quickReplyMessage");

    quickReplyMessageList.forEach((settings, index) => {
      quickReplyButtonTextElements[index].value = settings.text;
      quickReplyMessageElements[index].value = settings.quickReplyMessage;
    });

    quickReplyButtonTextElements[0].focus();
  }

  function saveQuickReplySettings() {
    const quickReplyButtonTextElements = document.querySelectorAll(
      ".quickReplyButtonText"
    );
    const quickReplyMessageElements =
      document.querySelectorAll(".quickReplyMessage");

    quickReplyMessageList.forEach((settings, index) => {
      settings.text = quickReplyButtonTextElements[index].value;
      settings.quickReplyMessage = quickReplyMessageElements[index].value;

      settings.buttonElement.removeEventListener(
        "click",
        settings.handleClickFn
      );
      settings.buttonElement.remove();

      delete settings.buttonElement;
      delete settings.handleClickFn;
    });

    localStorage.setItem(
      "Custom.Template.QuickReply",
      JSON.stringify(quickReplyMessageList)
    );

    generateButtons();

    quickReplySettingsDialog.style.display = "none";
  }

  quickReplySettingsDialogOkBtn.addEventListener("click", () => {
    saveQuickReplySettings();
  });

  quickReplySettingsDialogCancelBtn.addEventListener("click", () => {
    quickReplySettingsDialog.style.display = "none";
  });

  function resetQuickReplyFormValue() {
    const quickReplyButtonTextElements = document.querySelectorAll(
      ".quickReplyButtonText"
    );
    const quickReplyMessageElements =
      document.querySelectorAll(".quickReplyMessage");

    defaultQuickReplyMessageList.forEach((settings, index) => {
      quickReplyButtonTextElements[index].value = settings.text;
      quickReplyMessageElements[index].value = settings.quickReplyMessage;
    });
  }

  quickReplySettingsDialogResetBtn.addEventListener("click", () => {
    resetQuickReplyFormValue();
  });

  // ------------ 建立右側按鈕 相關程式碼 ------------
  function createButton(textContent, top) {
    const button = document.createElement("button");
    button.classList.add("primary", "custom-template-buttons");
    button.textContent = textContent;
    button.style.width = "165px";
    button.style.margin = "0 0 5px 0";
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "8px 10px";
    button.style.fontSize = "1rem";
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.style.textAlign = "left";
    button.style.whiteSpace = "nowrap";
    button.style.overflow = "hidden";
    button.style.textOverflow = "ellipsis";
    return button;
  }

  function showQuestionDialog() {
    const innerHTML =
      prefix.replace(/\n/g, "<br>") +
      " { $input } " +
      suffix.replace(/\n/g, "<br>");

    questionPreviewAreaDiv.innerHTML = innerHTML;

    questionDialog.style.display = "flex";
    questionDialogTextarea.value = "";

    questionDialogTextarea.focus();
  }

  function generateButtons() {

    const findCustomMenu = document.querySelector('.custom-menu');

    if(findCustomMenu){
      findCustomMenu.remove();
    }

    const menuDiv = document.createElement("div");
    menuDiv.classList.add("custom-menu");

    // 模版
    dataList.forEach((settings, index) => {
      const button = createButton(`${index + 1}. ${settings.text}`);

      const handleClick = () => {
        prefix = settings.prefix;
        suffix = settings.suffix;
        showQuestionDialog();
      };

      button.addEventListener("click", handleClick);

      settings.buttonElement = button;
      settings.handleClickFn = handleClick;

      menuDiv.appendChild(button);
    });

    // 繼續 按鈕

    const filteredContinueButton = Array.from(
      document.querySelectorAll(".custom-template-buttons")
    ).filter((element) => {
      return element.textContent === "C. 繼續";
    });

    if (filteredContinueButton.length) {
      filteredContinueButton[0].remove();
    }

    const continueButton = createButton(`C. 繼續`);

    continueButton.addEventListener("click", () => {
      sendMessage("繼續");
    });

    menuDiv.appendChild(continueButton);

    // 快速回覆按鈕
    const keys = ["Y", "U", "I", "O", "P"];
    quickReplyMessageList.forEach((settings, index) => {
      const button = createButton(`${keys[index]}. ${settings.text}`);

      const handleClick = () => {
        if (settings.quickReplyMessage.trim()) {
          sendMessage(settings.quickReplyMessage);
        }
      };

      button.addEventListener("click", handleClick);

      settings.buttonElement = button;
      settings.handleClickFn = handleClick;

      menuDiv.appendChild(button);
    });

    document.body.appendChild(menuDiv);
  }

  generateButtons();

  // ------------ 提示窗相關 ------------
  document.addEventListener("keydown", (event) => {
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "z"
    ) {
      shortcutKeyHintDialog.style.display = "flex";
      const templateButtonTextList = document.querySelectorAll(
        ".templateButtonText"
      );
      templateButtonTextList[0].textContent = dataList[0].text;
      templateButtonTextList[1].textContent = dataList[5].text;
      templateButtonTextList[2].textContent = dataList[1].text;
      templateButtonTextList[3].textContent = dataList[6].text;
      templateButtonTextList[4].textContent = dataList[2].text;
      templateButtonTextList[5].textContent = dataList[7].text;
      templateButtonTextList[6].textContent = dataList[3].text;
      templateButtonTextList[7].textContent = dataList[8].text;
      templateButtonTextList[8].textContent = dataList[4].text;
      templateButtonTextList[9].textContent = dataList[9].text;
      templateButtonTextList[10].textContent = quickReplyMessageList[0].text;
      templateButtonTextList[11].textContent = quickReplyMessageList[1].text;
      templateButtonTextList[12].textContent = quickReplyMessageList[2].text;
      templateButtonTextList[13].textContent = quickReplyMessageList[3].text;
      templateButtonTextList[14].textContent = quickReplyMessageList[4].text;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (
      (shortcutKeyHintDialog.style.display === "flex" &&
        event.key.toLocaleLowerCase() === "z") ||
      (shortcutKeyHintDialog.style.display === "flex" && event[mainKey])
    ) {
      shortcutKeyHintDialog.style.display = "none";
    }
  });

  // ------------ 監聽各式 composition 事件 ------------
  document.querySelectorAll(".btnTextInput").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  document.querySelectorAll(".prefixInput").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  document.querySelectorAll(".suffixInput").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  questionDialogTextarea.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  questionDialogTextarea.addEventListener("compositionend", () => {
    isComposing = false;
  });

  document.querySelectorAll(".quickReplyButtonText").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  document.querySelectorAll(".quickReplyMessage").forEach((input) => {
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });
  });

  // ------------ 控制視窗的焦點切換 ------------
  function controlQuestionDialogTabindex() {
    const questionDialogAllTabindexElements =
      questionDialog.querySelectorAll("textarea, button");
    const firstTabindexElement = questionDialogAllTabindexElements[0];
    const lastTabindexElement =
      questionDialogAllTabindexElements[
        questionDialogAllTabindexElements.length - 1
      ];

    questionDialog.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && !e.shiftKey) {
        if (document.activeElement === lastTabindexElement) {
          e.preventDefault();
          firstTabindexElement.focus();
        }
      } else if (e.key === "Tab" && e.shiftKey) {
        if (document.activeElement === firstTabindexElement) {
          e.preventDefault();
          lastTabindexElement.focus();
        }
      }
    });
  }
  controlQuestionDialogTabindex();

  function controlSettingsDialogTabindex() {
    // tableForm tabindexElements
    let tableFormTabindexElements = settingsTableForm.querySelectorAll(
      "input, textarea, button"
    );

    tableFormTabindexElements = [
      ...tableFormTabindexElements,
      settingsDialogOkBtn,
      settingsDialogCancelBtn,
      settingsDialogResetBtn,
    ];

    const tableFormFirstTabindexElement = tableFormTabindexElements[0];
    const tableFormLastTabindexElement =
      tableFormTabindexElements[tableFormTabindexElements.length - 1];

    // tableForm2 tabindexElements
    let tableForm2TabindexElements = settingsTableForm2.querySelectorAll(
      "input, textarea, button"
    );

    tableForm2TabindexElements = [
      ...tableForm2TabindexElements,
      settingsDialogOkBtn,
      settingsDialogCancelBtn,
      settingsDialogResetBtn,
    ];

    const tableForm2FirstTabindexElement = tableForm2TabindexElements[0];
    const tableForm2LastTabindexElement =
      tableForm2TabindexElements[tableForm2TabindexElements.length - 1];

    // settingsDialog keydown event
    settingsDialog.addEventListener("keydown", function (e) {
      if (settingsTableForm.style.display === "table") {
        if (e.key === "Tab" && !e.shiftKey) {
          if (document.activeElement === tableFormLastTabindexElement) {
            e.preventDefault();
            tableFormFirstTabindexElement.focus();
          }
        } else if (e.key === "Tab" && e.shiftKey) {
          if (document.activeElement === tableFormFirstTabindexElement) {
            e.preventDefault();
            tableFormLastTabindexElement.focus();
          }
        }
      }

      if (settingsTableForm2.style.display === "table") {
        if (e.key === "Tab" && !e.shiftKey) {
          if (document.activeElement === tableForm2LastTabindexElement) {
            e.preventDefault();
            tableForm2FirstTabindexElement.focus();
          }
        } else if (e.key === "Tab" && e.shiftKey) {
          if (document.activeElement === tableForm2FirstTabindexElement) {
            e.preventDefault();
            tableForm2LastTabindexElement.focus();
          }
        }
      }
    });
  }
  controlSettingsDialogTabindex();

  function controlQuickReplySettingsDialogTabindex() {
    const quickReplySettingsDialogAllTabindexElements =
      quickReplySettingsDialog.querySelectorAll("input,textarea, button");
    const firstTabindexElement = quickReplySettingsDialogAllTabindexElements[0];
    const lastTabindexElement =
      quickReplySettingsDialogAllTabindexElements[
        quickReplySettingsDialogAllTabindexElements.length - 1
      ];

    quickReplySettingsDialog.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && !e.shiftKey) {
        if (document.activeElement === lastTabindexElement) {
          e.preventDefault();
          firstTabindexElement.focus();
        }
      } else if (e.key === "Tab" && e.shiftKey) {
        if (document.activeElement === firstTabindexElement) {
          e.preventDefault();
          lastTabindexElement.focus();
        }
      }
    });
  }
  controlQuickReplySettingsDialogTabindex();
})();
