import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Util, KendoUtil } from '../utils';


/**
 * @typedef {Object} AutoComplete-Property
 * @property {string} id - 생성될 객체의 ID.
 * @property {string} name - 필드명
 * @property {string|number} width='100%' - 컴포넌트 width 값
 * @property {string} className - css class명
 * @property {string} method='POST' - 서버와 통신하는 http method
 * @property {object} params - 서버로 보내는 파라미터 정보
 * @property {object} responseKey - 서버 응답에 대한 데이터 추출 키
 *    - 서버 응답 결과에 대해 List와 totalCount로 데이터를 추출하는 키입니다.
 *      ```
 *      responseKey: {
 *          list: 'response.list',
 *          totalCount: 'response.totalCount'
 *      }
 *      ```
 * @property {string} placeholder - 필드에 값이 비어 있을 때 표기되는 text
 * @property {array|object} items - 데이터 셋, 서버와의 통신이 아닌 직접 데이터를 생성
 * @property {object} template - 화면에 표시되는 템플릿(태그)
 * @property {string} filter='startswith' - 필터 scope 정의
 * @property {string} separator=',' - 멀티로 검색할 경우. 설정하는 구분자
 * @property {number} minLength=1 - 최소 길이(검색어 최소길이)
 * @property {string} textField - data에서 text로 표시되는 field
 * 
 */
const propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    url: PropTypes.string,
    method: PropTypes.string,
    params: PropTypes.object,
    responseKey: PropTypes.object,
    placeholder: PropTypes.string,
    items: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    template: PropTypes.string,
    filter: PropTypes.string,
    separator: PropTypes.string,
    minLength: PropTypes.number,
    textField: PropTypes.string
}

const defaultProps = {
    width: '100%',
    method: 'POST', 
    responseKey: {
        list: null,
        totalCount: null,
    },
    placeholder: $ps_locale.autoComplete, 
    filter: 'startswith', 
    separator: ',', 
    minLength: 1,
    items: []
};

/**
 *  
 * @example
 * <Puf.AutoComplete name="AutoComplete" responseKey={{list: "data", totalCount: "count"}} />
 *
 * @desc
 *  Kendo AutoComplete
 * ============
 *  - 검색어(텍스트 필드)를 입력하면 자동 완성을 제공하는 필드
 *  - AutoComplete 프로퍼티 - {@link AutoComplete-Property}
 * @extends {React.Component}
 *
*/
class AutoComplete extends Component {
    /**
     * 생성자
     * @private
     */
    constructor(props) {
        super(props);

        // 컴포넌트 id
        this._id = props.id || Util.getUUID();
        // 컴포넌트 Dom
        this._$autoComplete = null;
        // 컴포넌트
        this._autoComplete = null;
        // 데이터의 총 건수
        this._totalCount = null;
    }

    /**
     * 최초 렌더링이 일어난 다음(한번 호출)
     * @private
     */
    componentDidMount() {
        // 컴포넌트 생성
        this._createComponent();    
    }

    /**
     * 컴포넌트 제약 조건
     * @private
     */
    static get _CONST() {
        return {
            _DATA_TYPE: 'json',
            _CONTENT_TYPE: 'application/json; charset=utf-8'
        }
    }
	
    /**
     * 컴포넌트 생성
     * @private
     */
    _createComponent() {
        this._$autoComplete = $('#' + this._id);
        this._autoComplete = this._$autoComplete.kendoAutoComplete(this._configuration(this.props));
    }
    
    /**
     * 컴포넌트 설정
     * @private
     */
    _configuration() {
        const { template, textField, minLength, separator } = this.props;
        const dataSource = this._dataSource();

        const configuration = {
            dataSource,
            template,
            minLength,
            separator,
            dataTextField: textField
        };
        return configuration;
    }

    /**
     * DataSource 생성
     * @private
     */
    _dataSource(props) {
        const { url, method, items, params, responseKey } = this.props;

        let dataSource;
        if(url) {
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: url,
                        type: method,
                        data: params,      
                        dataType: AutoComplete._CONST._DATA_TYPE,
                        contentType: AutoComplete._CONST._CONTENT_TYPE
                    },
                    parameterMap: function(data, type) {
                        return JSON.stringify(data);
                    }
                },
                schema: {
                    data: function(response) {
                        if(responseKey && responseKey.list) {
                            response = KendoUtil.setResponseKey(response, responseKey.list);
                        }
                        return response;
                    },
                    total: function(response) {
                        if(responseKey && responseKey.totalCount) {
                            response = KendoUtil.setResponseKey(response, responseKey.totalCount);
                        }else{
                            if(responseKey && responseKey.list) {
                                response = KendoUtil.setResponseKey(response, responseKey.list).length;
                            }else{
                                response = response.length;
                            }
                        }
                        this._totalCount = response;
                        return response;
                    }
                },
                serverFiltering: true
            });
        }else {
            dataSource = items;
        }
        return dataSource;
    }

    /**
     * 컴포넌트 리턴
     * @return {object} AutoComplete 컴포넌트 반환.
     */
    getComponent() {
        return this._autoComplete;
    }

    /**
     * 컴포넌트 Dom 리턴
     * @return {object} AutoComplete Dom 반환
     */
    getComponentDom() {
        return this._$autoComplete;
    }

    /**
     * @private
     */
    render() {
        const { name, width, className, placeholder } = this.props;
        const inputStyle = {
            width
        };
        return (
            <input id={this._id} name={name} className={classNames(className)} style={inputStyle} placeholder={placeholder} />
        );
    }
}

AutoComplete.propTypes = propTypes;
AutoComplete.defaultProps = defaultProps;

export default AutoComplete;