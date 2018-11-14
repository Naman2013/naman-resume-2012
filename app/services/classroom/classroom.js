/* Centralized repository of classroom API endpoints */
export const CLASSROOM_CREATENEWGROUP_PAGE_ENDPOINT_URL = '/api/page/createNewGroup';
export const CLASSROOM_CREATENEWGROUP_ENDPOINT_URL = '/api/classroom/createNewGroup';

export const CLASSROOM_GET_US_DISTRICTLIST_ENDPOINT_URL = '/api/school/getDistrictList';
export const CLASSROOM_GET_US_SCHOOLLIST_ENDPOINT_URL = '/api/school/getSchoolList';

export const CLASSROOM_SET_GROUP_DESCRIPTION_ENDPOINT_URL = '/api/classroom/setGroupDescription';
export const CLASSROOM_GET_GROUP_INVITATION_PANEL_ENDPOINT_URL = '/api/classroom/getGroupInvitationPanel';

/* Google Classroom Integrations
  - Get Classroom List
  - List Students for a Google Classroom
  - Assign/Create Google Classroom Students
*/
export const GOOGLE_CLASSROOM_IMPORT_PAGE_ENDPOINT_URL = '/api/page/importGoogleClassrooms';
export const GOOGLE_CLASSROOM_GET_CLASSROOM_LIST_ENDPOINT_URL = '/api/classroom/google/getClassroomList';
export const GOOGLE_CLASSROOM_IMPORT_CLASSROOMS_ENDPOINT_URL = '/api/classroom/google/importGoogleClassrooms';
export const GOOGLE_CLASSROOM_IMPORTSTUDENTS_PANEL_ENDPOINT_URL = '/api/classroom/google/importGoogleClassroomStudentsPanel';
export const GOOGLE_CLASSROOM_IMPORTSTUDENT_ENDPOINT_URL = '/api/classroom/google/importGoogleClassroomStudent';
