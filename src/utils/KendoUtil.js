/**
 * Kendo에서 사용되는 유틸 모음
 */
export default class KendoUtil {
    /**
     * Kendo에서 서버 응답 결과에 대한 키 처리를 담당하는 유틸
     * @param {object} response - response
     * @param {string} responseKey - 응답 추출 키
     * @return {array|object|string|number} - 추출된 결과 반환 
     */
	static setResponseKey(response, responseKey) {
		const keys = responseKey.split('.');
        for(const i in keys) {
            if(response[keys[i]]){
                response = response[keys[i]];
            }
        }
        return response;
	}
}