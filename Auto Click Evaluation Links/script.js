// ==UserScript==
// @name         Auto Click Evaluation Links
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  For TDTU
// @author       Hy
// @match        *://teaching-quality-survey.tdtu.edu.vn/choosesurvey.aspx*
// @match        *://teaching-quality-survey.tdtu.edu.vn/Survey.aspx*
// @match        *://teaching-quality-survey.tdtu.edu.vn/Result.aspx*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let links = [];
    let currentIndex = 0;

    function saveIndex(i) {
        localStorage.setItem('auto_eval_index', i);
    }

    function loadIndex() {
        const i = parseInt(localStorage.getItem('auto_eval_index') || '0', 10);
        return i;
    }

    function clearIndex() {
        localStorage.removeItem('auto_eval_index');
    }

    function startAutomation() {
        const allLinks = Array.from(document.querySelectorAll('a[href^="javascript:__doPostBack"]'));

        links = allLinks.filter(link => {
            const row = link.closest('tr');
            const tds = row.querySelectorAll('td');
            const status = tds[tds.length - 2]?.textContent.trim();
            const isPending = status === "Chưa đánh giá | Not yet";
            console.log(`[AutoEval] Row status: ${status} → ${isPending ? '✅ Chọn' : '❌ Bỏ qua'}`);
            return isPending;
        });

        if (links.length === 0) {
            alert("Không tìm thấy môn nào cần đánh giá.");
            return;
        }

        currentIndex = loadIndex();
        if (currentIndex >= links.length) {
            clearIndex();
            alert("✅ Đã hoàn thành tất cả các môn cần đánh giá.");
            return;
        }

        console.log(`[AutoEval] Đang click vào link ${currentIndex + 1}/${links.length}`);
        saveIndex(currentIndex);
        links[currentIndex].click();
    }

    function continueEvaluation() {
        const rd5 = document.querySelectorAll('input[type="radio"][value="rd5"]');
        rd5.forEach(r => r.click());
        console.log("[AutoEval] Đã đánh giá 5*");

        const btnTiepTuc = document.querySelector('#btnTiepTuc');
        if (btnTiepTuc) {
            console.log('[AutoEval] Nhấn nút Tiếp tục');
            setTimeout(() => btnTiepTuc.click(), 500);
        } else {
            console.warn('[AutoEval] Không tìm thấy nút Tiếp tục');
        }
    }

    function finalStep() {
        const btnDanhGia = document.querySelector('#btnTiepTucDanhGia');
        if (btnDanhGia) {
            console.log('[AutoEval] Nhấn nút Xác nhận đánh giá');
            setTimeout(() => {
                btnDanhGia.click();
                saveIndex(loadIndex() + 1);
            }, 200);
        } else {
            console.warn('[AutoEval] Không tìm thấy nút Tiếp tục đánh giá');
        }
    }

    window.addEventListener('load', () => {
        const url = window.location.href;

        console.log('[AutoEval] Current URL:', url);

        if (url.includes('choosesurvey')) {
            setTimeout(startAutomation, 200);
        } else if (url.includes('Survey')) {
            setTimeout(continueEvaluation, 200);
        } else if (url.includes('Result')) {
            setTimeout(finalStep, 200);
        } else {
            console.log('[AutoEval] Không nằm trong các trang xử lý. Bỏ qua.');
        }
    });
})();
