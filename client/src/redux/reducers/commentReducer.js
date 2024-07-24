const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case "POST_COMMENT_SUCCESS":
      return {
        ...state,
        comments: [...state.comments, action.payload.newComment],
        loading: false,
      };

    case "DELETE_COMMENT_SUCCESS":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload.removedComment._id
        ),
      };

    case "GET_COMMENTS_FAIL":
    case "POST_COMMENT_FAIL":
    case "DELETE_COMMENT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default commentReducer;