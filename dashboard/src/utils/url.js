export const updateQueryParamInUrl = (url, paramName, updatedValue) => {
  const urlObject = new URL(url);
  urlObject.searchParams.set(paramName, updatedValue);
  return urlObject.toString();
};

export const handleUpdateClick = (
    originalUrl,
    paramNameToUpdate,
    updatedParamValue
) => {
  const newUpdatedUrl = updateQueryParamInUrl(
    originalUrl,
    paramNameToUpdate,
    updatedParamValue
  );

  // Update the browser URL using React Router's history
  window.history.pushState(null, "", newUpdatedUrl);
};
