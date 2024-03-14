import React, { useLayoutEffect, useMemo, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { CircularProgress } from '@mui/material';

import { setPermissions } from '../../redux/slices/administrationStore/PermissionSlice';

const PermissionWrapper = memo(({ formId, action, children, componentIds, mode }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const createStateMode = mode === 'create';
  useLayoutEffect(() => {
    axios
      .post('/api/v1/uica/get', {
        formId,
        componentIds,
        createState: createStateMode,
      })
      .then((response) => {
        const { data = {} } = response;
        const { componentsAccess } = (data || {}).uica || {};
        const acc = componentsAccess.reduce((accData, { id, access, status, error }) => {
          const isVisible = access !== 'HIDDEN';
          const isDisabled = access === 'READ';
          return {
            ...accData,
            [id]: {
              isVisible,
              isDisabled,
              isEditable: isVisible && !isDisabled,
            },
          };
        }, {});

        dispatch(setPermissions({ permissionKey: formId, permissions: acc }));
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error('API endpoint not found');
        } else {
          console.error(error);
        }
        setLoading(false);
      });
  }, [formId]);

  if (loading) {
    return (
      <div>
        <CircularProgress />
        Loading
      </div>
    );
  }
  return <>{children}</>;
});

PermissionWrapper.propTypes = {
  formId: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  componentIds: PropTypes.any.isRequired,
  mode: PropTypes.string.isRequired,
  action: PropTypes.any.isRequired,
};

export default PermissionWrapper;
