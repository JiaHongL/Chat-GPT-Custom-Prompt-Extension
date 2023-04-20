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
        max-height:200px;
        overflow:auto;
        font-size: 18px;
      }
      .question-textarea {
          width: 100%;
          height: 350px;
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
      .dark .shortcut-content {
          color: #d1d5db !important;
      }
      .hidden-template-buttons .custom-template-buttons{
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
        max-height:700px;
        width:160px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .slide-checkbox {
        width: 80px;
        height: 26px;
        background: #333;
        margin: 20px auto;
        position: relative;
        border-radius: 50px;
        box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
      }
      .slide-checkbox:after {
        content: 'OFF';
        color: #000;
        position: absolute;
        right: 10px;
        z-index: 0;
        font: 12px/26px Arial, sans-serif;
        font-weight: bold;
        text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.15);
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
        width: 34px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        top: 3px;
        left: 3px;
        z-index: 1;
        background: #fcfff4;
        background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
        border-radius: 50px;
        transition: all 0.4s ease;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
      }
      .slide-checkbox input[type=checkbox] {
        visibility: hidden !important;
      }
      .slide-checkbox input[type=checkbox]:checked + label {
        left: 43px !important;
      } 
      .buy-me-a-coffee{
        display: inline-block;
      }     
      .buy-me-a-coffee-dark {
        display: none;
      }
      .dark .buy-me-a-coffee {
        display: none;
      }     
      .dark .buy-me-a-coffee-dark {
        display: inline-block;
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
              <textarea id="dialog-textarea" class="question-textarea" tabindex="1" placeholder="請輸入問題，Shift+Enter 為換行，輸入完成後，按下 Enter 即可送出。"></textarea>
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
            <th style="width:160px">按鈕名稱</th>
            <th>前段文字</th>
            <th>後段文字</th>
            <th style="width:118px">是否顯示</th>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox" name="check"  />
                <label for="slideCheckbox"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox2" name="check"  />
                <label for="slideCheckbox2"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox3" name="check"  />
                <label for="slideCheckbox3"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox4" name="check"  />
                <label for="slideCheckbox4"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox5" name="check"  />
                <label for="slideCheckbox5"></label>
              </div>
            </td>
          </tr>

        </table>

        <table id="table-form2" class="my-table" style="width:100%">
          <tr>
            <th style="width:118px">組合鍵</th>
            <th style="width:160px">按鈕名稱</th>
            <th>前段文字</th>
            <th>後段文字</th>
            <th style="width:118px">是否顯示</th>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox6" name="check"  />
                <label for="slideCheckbox6"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox7" name="check"  />
                <label for="slideCheckbox7"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox8" name="check"  />
                <label for="slideCheckbox8"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox9" name="check"/>
                <label for="slideCheckbox9"></label>
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
            <td>
              <div class="slide-checkbox">  
                <input class="promptSlide" type="checkbox" value="true" id="slideCheckbox10" name="check"/>
                <label for="slideCheckbox10"></label>
              </div>
            </td>
          </tr>
          
        </table>

        <div class="footer" class="center">
          <button tabindex="16" id="dialog2-ok" class="primary">儲存設定 ( ${mainKeyText} + s )</button>
          <button tabindex="17" id="dialog2-cancel" class="secondary">取消 ( esc ) </button>
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
            <span class="shortcut-content"> ${capitalizeFirstLetter(
              mainKeyText
            )} + B  </span>
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
            )} + G </span>
          </div>
        </td>
        <td>
          <div class="ellipsis">匯入 / 匯出 設定</div>
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
            )} + E </span>
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
          <th style="width:160px">按鈕名稱</th>
          <th>快速回覆的文字</th>
          <th style="width:118px">是否顯示</th>
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
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox11" name="check"/>
              <label for="slideCheckbox11"></label>
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
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox12" name="check"/>
              <label for="slideCheckbox12"></label>
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
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox13" name="check"/>
              <label for="slideCheckbox13"></label>
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
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox14" name="check"/>
              <label for="slideCheckbox14"></label>
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
          <td>
            <div class="slide-checkbox">  
              <input class="quickReplySlide" type="checkbox" value="true" id="slideCheckbox15" name="check"/>
              <label for="slideCheckbox15"></label>
            </div>
          </td>
        </tr>
      
      </table>

      <div class="footer" class="center">
        <button tabindex="11" id="dialog4-ok" class="primary">儲存設定 ( ${mainKeyText} + s )</button>
        <button tabindex="12" id="dialog4-cancel" class="secondary">取消 ( esc ) </button>
      </div>
  </div>

</div>  
  `;

  // 匯出匯入視窗 HTML
  const exportAndImportHTML = `
    <div id="dialog5" class="dialog-wrapper" style="display:none">

      <div class="dialog" style="max-width: 1100px;">

        <table class="my-table" style="width:100%">
          <tr>
            <th colspan="4">匯出 與 匯入 設定檔</th>
          </tr>
          <tr>
            <td style="width:100px">
              <div class="center">
                <button id="export" style="margin-right:0px;flex:0 0 65px;" class="success">匯出</button>
              </div>
            </td>
            <td> 
              <div class="center" style="justify-content: space-evenly;">
                <button id="importAll" class="primary">匯入全部</button>
                <button id="importPrompt" class="primary">只匯入問題樣板</button>
                <button id="importQuickReply" class="primary" style="margin-right:0px">只匯入快速回覆</button>
              </div>
            </td>
            <td> 
              <div class="center">
                <button id="resetSetting" class="info">恢復系統預設值</button>
              </div>
            </td>
            <td>
              <div class="center">
                <a href="https://www.buymeacoffee.com/Joe.lin" target="_blank">
                  <img style="scale: 0.9;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee !!&emoji=&slug=Joe.lin&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff?${new Date().getTime()}" />
                </a>
              </div>
            </td>
          </tr>        
        </table>

        <input style="display:none" type="file" id="importFileInput" name="file" accept="application/json">

        <div class="footer" class="center">
          <button id="dialog5-cancel" class="secondary">關閉 ( esc ) </button>
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

  const exportAndImportDialogEl = document.createElement("div");
  exportAndImportDialogEl.innerHTML = exportAndImportHTML;
  document.body.appendChild(exportAndImportDialogEl);

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
  const settingsTableForm = settingsDialog.querySelector("#table-form");
  const settingsTableForm2 = settingsDialog.querySelector("#table-form2");

  // Shortcut Key Hint
  const shortcutKeyHintDialog = document.getElementById("dialog3");

  // quickReply
  const quickReplySettingsDialog = document.getElementById("dialog4");
  const quickReplySettingsDialogOkBtn = document.querySelector("#dialog4-ok");
  const quickReplySettingsDialogCancelBtn =
    document.querySelector("#dialog4-cancel");

  // exportAndImport
  const exportAndImportDialog = document.getElementById("dialog5");
  const exportSettingsBtn = document.getElementById("export");
  const importAllBtn = document.getElementById("importAll");
  const importOnlyPromptBtn = document.getElementById("importPrompt");
  const importOnlyQuickReplyBtn = document.getElementById("importQuickReply");
  const resetSettingBtn = document.getElementById("resetSetting");
  const exportAndImportDialogCancelBtn =
    document.getElementById("dialog5-cancel");

  const importFileInput = document.getElementById("importFileInput");

  // other
  let intervalID = null;
  let modeBtn = null;

  let isComposing = false;

  /** 1:form or 2:form2 */
  let currentSettingFormType;

  /** 0:all or 1:prompt or 2:quickReply */
  let importType;

  // promptList / quickReply
  const defaultPromptList = [
    {
      key: "1",
      text: "自由提問",
      prefix: "",
      suffix: "，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "2",
      text: "英文解釋",
      prefix: "你現在是一個英文教育專家，請解釋英文單字 [",
      suffix: "]，拼音、詞性，並給出 5 個中英文的範例。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "3",
      text: "多國語系翻譯",
      prefix: "你現在是一個翻譯專家，請幫我翻譯 [",
      suffix:
        "] 的繁體中文、簡體中文、英文、日文，\n並請使用表格顯示，表頭分別為 zh-tw、zh-cn、en、ja，\n不需要其他解釋或說明。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "4",
      text: "程式問題",
      prefix: "你現在是一個 Angular、RxJs、Typescript、Javascript 專家，\n",
      suffix: "\n，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "5",
      text: "CSS 範例",
      prefix: "你現在是一個 CSS 專家，請幫我做出以下敘述的樣式：\n",
      suffix: "\n，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "6",
      text: "整理重點",
      prefix:
        "你現在是個閱讀專家，請幫我整理下面文章的重點，使用條列方式，列出 10 點，最後給出一個總結：\n\n",
      suffix: "\n\n，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "7",
      text: "研究報告",
      prefix: "寫一篇有關",
      suffix:
        "的 300 字研究報告，報告中需引述最新的研究，並引用專家觀點，請使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "8",
      text: "文字修飾",
      prefix: "請幫我修飾以下敘述，符合台灣用語，且輕鬆活潑。\n\n",
      suffix: "",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "9",
      text: "問題建議",
      prefix: "我遇到以下問題：\n",
      suffix: "\n請幫我想出解決方式或替代方案，並使用繁體中文回答。",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "10",
      text: "登山建議",
      prefix: "你現在是一個登山專家，我近期打算去爬",
      suffix:
        "，請使用繁體中文回答，回答需包括以下內容：\n1. 登山難度及時間\n2. 交通資訊\n3. 景點氣候特性\n4. 其他補充",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
  ];

  let promptList = [];

  const defaultQuickReplyMessageList = [
    {
      key: "Y",
      text: "提供其它範例",
      quickReplyMessage: "請提供其它範例",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "U",
      text: "更詳細的說明",
      quickReplyMessage: "請提供更細節的說明",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "I",
      text: "提供程式範例",
      quickReplyMessage: "請提供程式範例",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "O",
      text: "翻譯成繁體中文",
      quickReplyMessage: "請翻譯成繁體中文",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
    {
      key: "P",
      text: "翻譯成英文",
      quickReplyMessage: "請翻譯成英文",
      buttonElement: null,
      handleClickFn: null,
      isVisible: true,
    },
  ];

  let quickReplyMessageList = [];

  // 開關選單的選項加在右側

  let mutationTimer = null;

  function addCustomLeftMenuItem() {
    try {
      const customATagEl = document.createElement("a");
      customATagEl.classList.add(
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "hover:bg-gray-500/10",
        "transition-colors",
        "duration-200",
        "text-white",
        "cursor-pointer",
        "text-sm"
      );

      const switchMenuDiv = document.createElement("div");
      switchMenuDiv.innerHTML = `    
        <div class="flex items-center justify-between">
        <svg style="height:16px;width:16px;margin-right: 12px;fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>
          <div>提問助手選單</div>
          <div class="slide-checkbox" style="margin: 0 0 0 20px;">  
            <input type="checkbox" value="true" id="switchMenu" name="check"/>
            <label for="switchMenu"></label>
          </div>
        </div>
      `;

      customATagEl.appendChild(switchMenuDiv);
      const nav = document.querySelector("nav.flex");
      nav.insertBefore(customATagEl, nav.children[2]);

      document.getElementById("switchMenu").checked =
        localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y"
          ? false
          : true;

      document
        .getElementById("switchMenu")
        .addEventListener("change", function () {
          if (this.checked) {
            localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
            document.body.classList.remove("hidden-template-buttons");
          } else {
            localStorage.setItem("Custom.Settings.Menu.Hidden", "Y");
            document.body.classList.add("hidden-template-buttons");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  function addCustomLeftMenuItem2() {
    try {
      const customATagEl = document.createElement("a");
      customATagEl.classList.add(
        "flex",
        "py-3",
        "px-3",
        "items-center",
        "gap-3",
        "rounded-md",
        "hover:bg-gray-500/10",
        "transition-colors",
        "duration-200",
        "text-white",
        "cursor-pointer",
        "text-sm"
      );

      const menuItemDiv = document.createElement("div");
      menuItemDiv.innerHTML = `    
        <div id="downloadChatPDF" class="flex items-center justify-between">
          <svg style="height:16px;width:16px;margin-right: 12px;fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
          <div>下載當前對話的網頁</div>
        </div>
      `;

      customATagEl.appendChild(menuItemDiv);
      const nav = document.querySelector("nav.flex");
      nav.insertBefore(customATagEl, nav.children[3]);

      downloadChatPDF.addEventListener("click", () => {

        const container = document.querySelector("main")?.children[0].children[0].children[0];
        const clonedContainer = container.cloneNode(true);
        const avatarList = clonedContainer.querySelectorAll('img.rounded-sm');
        const buttons = clonedContainer.querySelectorAll('button');

        avatarList.forEach((avatar)=>{
          const originalElement = avatar;
          const newElement = document.createElement('div');
          newElement.innerHTML = '<svg style="height:30px;width:30px;fill: #5A7DAB;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>'
          const parentElement = originalElement.parentNode;
          while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
          }
          parentElement.appendChild(newElement);
        });

        buttons.forEach((button)=>{
          button.remove();
        });

        const html = clonedContainer.outerHTML;
        const styles = Array.from(document.styleSheets)
          .filter(styleSheet => !styleSheet.href || styleSheet.href.startsWith(window.location.origin))
          .map(styleSheet => Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\n'))
          .join('\n');
        const blob = new Blob([`<!DOCTYPE html>\n<html>\n<head>\n<style>\n${styles}\n</style>\n</head>\n<body>\n${html}\n</body>\n</html>`], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = document.title + '.html';
        document.body.appendChild(a);
        a.click();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function subscribeMutationObserver() {
    // 取得要監聽的 DOM 元素
    var targetNode = document.body;

    // 設定 MutationObserver
    var observer = new MutationObserver(function (mutations) {
      // 如果 0.5 秒內沒有新的變動，就處理變動
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(function () {
        if (
          document.querySelector("nav.flex") &&
          !document.getElementById("switchMenu")
        ) {
          addCustomLeftMenuItem();
          addCustomLeftMenuItem2();
        }
      }, 500);
    });

    // 開始監聽 DOM 變動
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
  }
  subscribeMutationObserver();

  // 初始化
  function init() {
    questionDialog.style.display = "none";
    settingsDialog.style.display = "none";
    shortcutKeyHintDialog.style.display = "none";
    exportAndImportDialog.style.display = "none";

    if (!localStorage.getItem("Custom.Settings.Prompt")) {
      localStorage.setItem(
        "Custom.Settings.Prompt",
        JSON.stringify(defaultPromptList)
      );
    }

    if (!localStorage.getItem("Custom.Settings.QuickReply")) {
      localStorage.setItem(
        "Custom.Settings.QuickReply",
        JSON.stringify(defaultQuickReplyMessageList)
      );
    }

    if (localStorage.getItem("Custom.Settings.Menu.Hidden") === null) {
      localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
    }

    localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y"
      ? document.body.classList.add("hidden-template-buttons")
      : document.body.classList.remove("hidden-template-buttons");

    promptList = JSON.parse(localStorage.getItem("Custom.Settings.Prompt"));

    quickReplyMessageList = JSON.parse(
      localStorage.getItem("Custom.Settings.QuickReply")
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

  function findModeOptionAndClick(textContent) {
    clearInterval(intervalID);
    intervalID = setInterval(function () {
      const option = Array.from(
        document.querySelectorAll('[role="option"]')
      ).find((element) => element.textContent.includes(textContent));
      if (option) {
        option?.click();
        clearInterval(intervalID);
      }
    }, 250);
  }

  function darkModeToggle() {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
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

    // esc : close exportAndImportDialog
    if (
      !isComposing &&
      exportAndImportDialog.style.display === "flex" &&
      event.key === "Escape"
    ) {
      event.preventDefault();
      exportAndImportDialog.style.display = "none";
      return;
    }

    // mainKey + w : open settingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "s"
    ) {
      event.preventDefault();
      showSettingsDialog(2);
      return;
    }

    // mainKey + e : open quickReplySettingsDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "e"
    ) {
      event.preventDefault();
      showQuickReplySettingsDialog();
      return;
    }

    // mainKey + g : open exportAndImportDialog
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "g"
    ) {
      event.preventDefault();
      openExportAndImportDialog();
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

    // mainKey + r : regenerate response
    if (
      settingsDialog.style.display === "none" &&
      questionDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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

      if (localStorage.getItem("Custom.Settings.Menu.Hidden") === "Y") {
        localStorage.setItem("Custom.Settings.Menu.Hidden", "N");
        document.body.classList.remove("hidden-template-buttons");
        try {
          document.getElementById("switchMenu").checked = true;
        } catch (error) {}
      } else {
        localStorage.setItem("Custom.Settings.Menu.Hidden", "Y");
        document.body.classList.add("hidden-template-buttons");
        try {
          document.getElementById("switchMenu").checked = false;
        } catch (error) {}
      }

      return;
    }

    // main + b : change to gpt-4 or gpt-3.5 (url)
    if (
      event[mainKey] && event.key.toLocaleLowerCase() === "b"
    ) {
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
      exportAndImportDialog.style.display === "none" &&
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
      exportAndImportDialog.style.display === "none" &&
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
        findModeOptionAndClick("GPT-4");
      } else {
        findModeOptionAndClick("Default (GPT-3.5)");
      }

      return;
    }

    // mainKey + 1 ~ 0 number keyboard : open question dialog
    if (
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey]
    ) {
      switch (event.key) {
        case "1":
          event.preventDefault();
          promptList[0].buttonElement.click();
          break;

        case "2":
          event.preventDefault();
          promptList[1].buttonElement.click();
          break;

        case "3":
          event.preventDefault();
          promptList[2].buttonElement.click();
          break;

        case "4":
          event.preventDefault();
          promptList[3].buttonElement.click();
          break;

        case "5":
          event.preventDefault();
          promptList[4].buttonElement.click();
          break;

        case "6":
          event.preventDefault();
          promptList[5].buttonElement.click();
          break;

        case "7":
          event.preventDefault();
          promptList[6].buttonElement.click();
          break;

        case "8":
          event.preventDefault();
          promptList[7].buttonElement.click();
          break;

        case "9":
          event.preventDefault();
          promptList[8].buttonElement.click();
          break;

        case "0":
          event.preventDefault();
          promptList[9].buttonElement.click();
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

    chatInput.value = message;
    chatInput.dispatchEvent(new Event("input", { bubbles: true }));
    chatInput.focus();

    if (isGenerating) {
      setTimeout(() => {
        sendButton.click();
      }, 500);
    } else {
      setTimeout(() => {
        sendButton.click();
      }, 100);
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

  // prompt 視窗
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
    const promptSlideElements = document.querySelectorAll(".promptSlide");

    let startIndex = 0;
    let endIndex = 5;

    if (formType == 2) {
      startIndex = 5;
      endIndex = 10;
    }

    for (let index = startIndex; index < endIndex; index++) {
      btnTextInputElements[index].value = promptList[index].text;
      prefixInputElements[index].value = promptList[index].prefix;
      suffixInputElements[index].value = promptList[index].suffix;
      promptSlideElements[index].checked = promptList[index].isVisible;
    }

    currentSettingFormType === 1
      ? btnTextInputElements[0].focus()
      : btnTextInputElements[5].focus();
  }

  function saveSittings() {
    const btnTextInputElements = document.querySelectorAll(".btnTextInput");
    const prefixInputElements = document.querySelectorAll(".prefixInput");
    const suffixInputElements = document.querySelectorAll(".suffixInput");
    const promptSlideElements = document.querySelectorAll(".promptSlide");

    let startIndex = 0;
    let endIndex = 5;

    if (currentSettingFormType == 2) {
      startIndex = 5;
      endIndex = 10;
    }

    const previousPromptList = JSON.parse(JSON.stringify(promptList));

    for (let index = startIndex; index < endIndex; index++) {
      promptList[index].text = btnTextInputElements[index].value;
      promptList[index].prefix = prefixInputElements[index].value;
      promptList[index].suffix = suffixInputElements[index].value;
      promptList[index].isVisible = promptSlideElements[index].checked;

      if (previousPromptList.isVisible) {
        promptList[index].buttonElement.removeEventListener(
          "click",
          promptList[index].handleClickFn
        );
        promptList[index].buttonElement.remove();

        delete promptList[index].buttonElement;
        delete promptList[index].handleClickFn;
      }
    }

    localStorage.setItem("Custom.Settings.Prompt", JSON.stringify(promptList));

    generateButtons();

    settingsDialog.style.display = "none";
  }

  settingsDialogOkBtn.addEventListener("click", () => {
    saveSittings();
  });

  settingsDialogCancelBtn.addEventListener("click", () => {
    settingsDialog.style.display = "none";
  });

  // ------------ 快速回覆設定視窗 ------------
  function showQuickReplySettingsDialog() {
    quickReplySettingsDialog.style.display = "flex";

    const quickReplyButtonTextElements = document.querySelectorAll(
      ".quickReplyButtonText"
    );
    const quickReplyMessageElements =
      document.querySelectorAll(".quickReplyMessage");

    const quickReplySlideElements =
      document.querySelectorAll(".quickReplySlide");

    quickReplyMessageList.forEach((settings, index) => {
      quickReplyButtonTextElements[index].value = settings.text;
      quickReplyMessageElements[index].value = settings.quickReplyMessage;
      quickReplySlideElements[index].checked = settings.isVisible;
    });

    quickReplyButtonTextElements[0].focus();
  }

  function saveQuickReplySettings() {
    const quickReplyButtonTextElements = document.querySelectorAll(
      ".quickReplyButtonText"
    );
    const quickReplyMessageElements =
      document.querySelectorAll(".quickReplyMessage");

    const quickReplySlideElements =
      document.querySelectorAll(".quickReplySlide");

    const previousQuickReplyMessageList = JSON.parse(
      JSON.stringify(quickReplyMessageList)
    );

    quickReplyMessageList.forEach((settings, index) => {
      settings.text = quickReplyButtonTextElements[index].value;
      settings.quickReplyMessage = quickReplyMessageElements[index].value;
      settings.isVisible = quickReplySlideElements[index].checked;

      if (previousQuickReplyMessageList.isVisible) {
        settings.buttonElement.removeEventListener(
          "click",
          settings.handleClickFn
        );
        settings.buttonElement.remove();

        delete settings.buttonElement;
        delete settings.handleClickFn;
      }
    });

    localStorage.setItem(
      "Custom.Settings.QuickReply",
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

  // ------------ 提示窗相關 ------------
  document.addEventListener("keydown", (event) => {
    if (
      questionDialog.style.display === "none" &&
      settingsDialog.style.display === "none" &&
      quickReplySettingsDialog.style.display === "none" &&
      exportAndImportDialog.style.display === "none" &&
      event[mainKey] &&
      event.key.toLocaleLowerCase() === "z"
    ) {
      shortcutKeyHintDialog.style.display = "flex";
      const templateButtonTextList = document.querySelectorAll(
        ".templateButtonText"
      );
      templateButtonTextList[0].textContent = promptList[0].text;
      templateButtonTextList[1].textContent = promptList[5].text;
      templateButtonTextList[2].textContent = promptList[1].text;
      templateButtonTextList[3].textContent = promptList[6].text;
      templateButtonTextList[4].textContent = promptList[2].text;
      templateButtonTextList[5].textContent = promptList[7].text;
      templateButtonTextList[6].textContent = promptList[3].text;
      templateButtonTextList[7].textContent = promptList[8].text;
      templateButtonTextList[8].textContent = promptList[4].text;
      templateButtonTextList[9].textContent = promptList[9].text;
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

  // ------------ 匯出/匯入視窗相關 ------------
  function openExportAndImportDialog() {
    exportAndImportDialog.style.display = "flex";
  }

  exportAndImportDialogCancelBtn.addEventListener("click", () => {
    exportAndImportDialog.style.display = "none";
  });

  function downloadFile(data, filename, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportSettingsBtn.addEventListener("click", () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let date = now.getDate().toString().padStart(2, "0");
    let hour = now.getHours().toString().padStart(2, "0");
    let minute = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    const fileName = `chatGPT提問助手_設定檔_${year}年${month}月${date}日${hour}點${minute}分${seconds}秒`;

    const currentPromptSetting = JSON.parse(JSON.stringify(promptList));
    const currentQuickReplyMessageList = JSON.parse(
      JSON.stringify(quickReplyMessageList)
    );

    currentPromptSetting.forEach((setting) => {
      delete setting.buttonElement;
      delete setting.handleClickFn;
    });

    currentQuickReplyMessageList.forEach((setting) => {
      delete setting.buttonElement;
      delete setting.handleClickFn;
    });

    const jsonData = JSON.stringify(
      {
        settings: {
          prompt: currentPromptSetting,
          quickReply: currentQuickReplyMessageList,
          isHiddenMenu: localStorage.getItem("Custom.Settings.Menu.Hidden"),
        },
      },
      null,
      2
    );

    downloadFile(
      jsonData,
      `${fileName}.json`,
      "application/json;charset=utf-8;"
    );
  });

  importAllBtn.addEventListener("click", () => {
    importType = 0;
    importFileInput.click();
  });

  importOnlyPromptBtn.addEventListener("click", () => {
    importType = 1;
    importFileInput.click();
  });

  importOnlyQuickReplyBtn.addEventListener("click", () => {
    importType = 2;
    importFileInput.click();
  });

  resetSettingBtn.addEventListener("click", () => {
    const result = confirm("確定要還原到系統最初的 預設樣板 與 快速回覆 ?");

    if (result) {
      localStorage.setItem(
        "Custom.Settings.Prompt",
        JSON.stringify(defaultPromptList)
      );

      localStorage.setItem(
        "Custom.Settings.QuickReply",
        JSON.stringify(defaultQuickReplyMessageList)
      );

      promptList = defaultPromptList;
      quickReplyMessageList = defaultQuickReplyMessageList;

      generateButtons();

      alert("已還原成功!");
    }
  });

  function checkFileContent(obj) {
    let isValidated = true;

    try {
      if (!obj.hasOwnProperty("settings")) {
        isValidated = false;
      }

      if (!obj.settings.hasOwnProperty("isHiddenMenu")) {
        isValidated = false;
      }

      if (!obj.settings.hasOwnProperty("prompt")) {
        isValidated = false;
      } else {
        obj.settings.prompt.forEach((setting) => {
          if (
            !setting.hasOwnProperty("isVisible") ||
            typeof setting.isVisible !== "boolean"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("key") ||
            typeof setting.key !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("text") ||
            typeof setting.text !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("prefix") ||
            typeof setting.prefix !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("suffix") ||
            typeof setting.suffix !== "string"
          ) {
            isValidated = false;
          }
        });
      }

      if (!obj.settings.hasOwnProperty("quickReply")) {
        isValidated = false;
      } else {
        obj.settings.quickReply.forEach((setting) => {
          if (
            !setting.hasOwnProperty("isVisible") ||
            typeof setting.isVisible !== "boolean"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("key") ||
            typeof setting.key !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("text") ||
            typeof setting.text !== "string"
          ) {
            isValidated = false;
          }
          if (
            !setting.hasOwnProperty("quickReplyMessage") ||
            typeof setting.quickReplyMessage !== "string"
          ) {
            isValidated = false;
          }
        });
      }
    } catch (error) {
      isValidated = false;
      console.log("error", error);
    }

    return isValidated;
  }

  function handleFileLoad(event) {
    const json = JSON.parse(event.target.result);

    if (!checkFileContent(json)) {
      importFileInput.value = "";
      alert("檔案內容有誤，請從重選擇");
      return;
    }

    let confirmMessage = "";

    switch (importType) {
      case 1:
        confirmMessage = `確定只匯入『${importFileInput.files[0].name}』的 問題樣板 ?`;
        break;

      case 2:
        confirmMessage = `確定只匯入『${importFileInput.files[0].name}』的 快速回覆 ?`;
        break;

      default:
        confirmMessage = `確定匯入『${importFileInput.files[0].name}』?`;
        break;
    }

    const result = confirm(confirmMessage);

    if (result) {
      // 暫時不覆蓋 isHiddenMenu ，避免使用者誤會選單消失。
      // json.settings.isHiddenMenu === "Y"
      //   ? document.body.classList.add("hidden-template-buttons")
      //   : document.body.classList.remove("hidden-template-buttons");

      // 覆蓋問題樣板
      if (importType === 0 || importType === 1) {
        const previousPromptList = JSON.parse(JSON.stringify(promptList));

        promptList.forEach((setting, index) => {
          setting.text = json.settings.prompt[index].text;
          setting.prefix = json.settings.prompt[index].prefix;
          setting.suffix = json.settings.prompt[index].suffix;
          setting.isVisible = json.settings.prompt[index].isVisible;

          if (previousPromptList.isVisible) {
            setting.buttonElement.removeEventListener(
              "click",
              setting.handleClickFn
            );
            setting.buttonElement.remove();

            delete setting.buttonElement;
            delete setting.handleClickFn;
          }

          localStorage.setItem(
            "Custom.Settings.Prompt",
            JSON.stringify(promptList)
          );
        });
      }

      // 覆蓋快速回覆
      if (importType === 0 || importType === 2) {
        const previousQuickReplyMessageList = JSON.parse(
          JSON.stringify(quickReplyMessageList)
        );

        quickReplyMessageList.forEach((settings, index) => {
          settings.text = json.settings.quickReply[index].text;
          settings.quickReplyMessage =
            json.settings.quickReply[index].quickReplyMessage;
          settings.isVisible = json.settings.quickReply[index].isVisible;

          if (previousQuickReplyMessageList.isVisible) {
            settings.buttonElement.removeEventListener(
              "click",
              settings.handleClickFn
            );
            settings.buttonElement.remove();

            delete settings.buttonElement;
            delete settings.handleClickFn;
          }
        });

        localStorage.setItem(
          "Custom.Settings.QuickReply",
          JSON.stringify(quickReplyMessageList)
        );
      }

      generateButtons();

      alert("匯入成功!");

      importFileInput.value = "";
    } else {
      importFileInput.value = "";
    }
  }

  importFileInput.addEventListener("change", () => {
    const file = importFileInput.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(file);
  });

  // ------------ 建立右側按鈕 相關程式碼 ------------
  function createButton(textContent, btnColorClass = "success") {
    const button = document.createElement("button");
    button.classList.add(btnColorClass, "custom-template-buttons");
    button.textContent = textContent;
    button.style.width = "155px";
    button.style.margin = "0 0 5px 0";
    button.style.color = "white";
    button.style.border = "none";
    button.style.padding = "3px 10px";
    button.style.fontSize = "1rem";
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    button.style.textAlign = "left";
    button.style.whiteSpace = "nowrap";
    button.style.overflow = "hidden";
    button.style.textOverflow = "ellipsis";
    return button;
  }

  function generateButtons() {
    const findCustomMenu = document.querySelector(".custom-menu");

    if (findCustomMenu) {
      findCustomMenu.remove();
    }

    const menuDiv = document.createElement("div");
    menuDiv.classList.add("custom-menu");

    // 模版
    promptList.forEach((settings) => {
      if (!settings.isVisible) {
        return;
      }

      const button = createButton(`${settings.key}. ${settings.text}`);

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

    const continueButton = createButton(`C. 繼續`, "info");

    continueButton.addEventListener("click", () => {
      sendMessage("繼續");
    });

    menuDiv.appendChild(continueButton);

    // 快速回覆按鈕
    quickReplyMessageList.forEach((settings) => {
      if (!settings.isVisible) {
        return;
      }

      const button = createButton(`${settings.key}. ${settings.text}`, "info");

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

    // prompt settings
    const promptSettingsButton = createButton(`W. 提問樣板 設定`, "primary");
    promptSettingsButton.addEventListener("click", () => {
      showSettingsDialog(1);
    });
    menuDiv.appendChild(promptSettingsButton);

    // prompt settings2
    const promptSettingsButton2 = createButton(`S. 提問樣板2 設定`, "primary");
    promptSettingsButton2.addEventListener("click", () => {
      showSettingsDialog(2);
    });
    menuDiv.appendChild(promptSettingsButton2);

    // quickReply Settings
    const quickReplySettingsButton2 = createButton(
      `E. 快速回覆 設定`,
      "primary"
    );
    quickReplySettingsButton2.addEventListener("click", () => {
      showQuickReplySettingsDialog();
    });
    menuDiv.appendChild(quickReplySettingsButton2);

    // 匯出匯入設定擋
    const exportAndImportConfigButton = createButton(
      `G. 匯入 / 匯出 設定`,
      "primary"
    );
    exportAndImportConfigButton.addEventListener("click", () => {
      openExportAndImportDialog();
    });
    menuDiv.appendChild(exportAndImportConfigButton);

    // 重新設定高度
    menuDiv.style.maxHeight = `${menuDiv.children.length * 35}px`;

    document.body.appendChild(menuDiv);
  }

  generateButtons();

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
