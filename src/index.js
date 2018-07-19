import './static/css/think.css';

import $ from 'jquery';
import html2canvas from './static/js/html2canvas.js';

import './static/js/jquery.support.1.0.0';

$(function () {
    $('.editor-left')
        .text('我想...')
        .css({"height": 132, "overflow-y": "hidden"})
        .on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            $('.show-left').html('<del>' + $(this).val().replace(/</g, '').replace(/>/g, '').replace(/\n/g, '<br/>') + '</del>')
        }).trigger('input');

    $('.img-container').on('resize', function () {
        $(this).height($(this).width());
    }).trigger('resize');

    $('.editor-right')
        .text('不,你不想!')
        .css({"height": 132, "overflow-y": "hidden"})
        .on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            $('.show-right').html($(this).val().replace(/</g, '').replace(/>/g, '').replace(/\n/g, '<br/>'))
        }).trigger('input');

    $("#save").click(function () {
        html2canvas($('.img-container')[0]).then(function (canvas) {
            canvas.setAttribute('crossOrigin', 'anonymous');
            var data = canvas.toDataURL("image/png");
            $('#show').prop('src', data);
        });
    })
});
