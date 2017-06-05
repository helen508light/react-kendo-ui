'use strict';

var React = require('react');

var FineUploaderDemo = React.createClass({
    doGetFile: function(){
        this.refs.file.refreshSession({atch_file_id: 184});
    },
    onSessionRequestComplete: function(response, success, xhr, fineUploader){
        let fileList = response;
        if(fileList.length > 0){
            fileList.forEach((file, idx) => {
                let fileSelector = qq(fineUploader.getItemByFileId(idx)).getByClass('qq-upload-file-selector')[0];
                $(fileSelector).replaceWith("<span class='qq-upload-file-selector qq-upload-file' title="+file.name+"><a href='http://localhost:8090/itg/base/downloadAtchFile.do?atch_file_id="+file.atch_file_id+"&file_idx="+file.file_idx+"' download='"+file.name+"'>"+file.name+"</a></span>" );
            });
        }
    },

    render: function() {
        // ITG Demo 서버(React 개발용)
        const host = "http://192.168.233.22:9082";
        //const host = "http://localhost:8090";

        const sessionUrl="/itg/base/selectAjaxAtchFileList.do";
        const uploadUrl="/itg/base/ajaxFileUpload.do";
        const deleteUrl="/itg/base/ajaxRemoveFile.do";

        return (
            <div>{/* start default */}
                <Puf.FineUploader ref="file" host={host} sessionUrl={sessionUrl} uploadUrl={uploadUrl} deleteUrl={deleteUrl} onSessionRequestComplete={this.onSessionRequestComplete} />
                <button onClick={this.doGetFile}>파일정보 불러오기</button>
            </div>
        );
    }
});

module.exports = FineUploaderDemo;
