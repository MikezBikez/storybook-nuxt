"use strict";

const WEBFORM_CODE = {
  cdc: "CD",
  scaf: "CL",
  fobq: "BQ",
  fosq: "SQ"
};
const WEBFORM_STATUS = {
  SAVE_AND_SUBMIT: "SSA"
};

const WEBFORM_CODES = {
  CD: "cdc",
  CL: "scaf",
  BQ: "fobq",
  SQ: "fosq"
};

const WEBFORM_REQUIRED_DOCUMENTS = {
  cdc: [],
  scaf: ["egl", "cdc"],
  fobq: ["egl", "cdc"],
  fosq: ["egl", "cdc"]
};

const WEBFORM_STATUS_MAPPING = {
  cdc: {
    default: {
      completed: [],
      pending: ["*"]
    },
    SLC: {
      completed: [],
      pending: ["*"]
    },
    SLA: {
      completed: [],
      pending: ["*"]
    },
    SSC: {
      completed: [],
      pending: ["*"]
    },
    SSA: {
      completed: ["*"],
      pending: []
    }
  },
  scaf: {
    default: {
      completed: [],
      pending: ["*"]
    },
    SLC: {
      completed: [],
      pending: ["*"]
    },
    SLA: {
      completed: [],
      pending: ["*"]
    },
    SSC: {
      completed: [],
      pending: ["*"]
    },
    SSA: {
      completed: ["*"],
      pending: []
    }
  },
  fosq: {
    default: {
      completed: [],
      pending: []
    },
    SLC: {
      completed: [],
      pending: []
    },
    SLA: {
      completed: [],
      pending: []
    },
    SSC: {
      completed: ["*"],
      pending: []
    },
    SSA: {
      completed: ["*"],
      pending: []
    }
  },
  fobq: {
    default: {
      completed: [],
      pending: []
    },
    SLC: {
      completed: [],
      pending: []
    },
    SLA: {
      completed: [],
      pending: []
    },
    SSC: {
      completed: ["*"],
      pending: []
    },
    SSA: {
      completed: ["*"],
      pending: []
    }
  }
};

const WEBFORM_VALIDATION = {
  CD: {
    default: {
      allowedRoles: ["CPM", "ADM", "CON"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "review"
        },
        ADM: {
          isEnabled: true,
          actionType: "review"
        },
        CON: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SLC: {
      allowedRoles: ["CPM", "ADM", "CON"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "review"
        },
        ADM: {
          isEnabled: true,
          actionType: "review"
        },
        CON: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SSC: {
      allowedRoles: ["CPM", "ADM"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "review"
        },
        ADM: {
          isEnabled: true,
          actionType: "review"
        }
      },
      defaultAccess: "download"
    },
    SLA: {
      allowedRoles: ["CPM", "ADM"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "review"
        },
        ADM: {
          isEnabled: true,
          actionType: "review"
        }
      },
      defaultAccess: "download"
    },
    SSA: {
      allowedRoles: ["*"] /* WILDCARD this accepts all roles */,
      allowedRolesAccess: {},
      defaultAccess:
        "download" /* Since all the roles are allowed, all will be granted the default access */
    }
  },
  CL: {
    default: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: false,
          actionType: "review"
        },
        ADM: {
          isEnabled: false,
          actionType: "review"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SLC: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: false,
          actionType: "review"
        },
        ADM: {
          isEnabled: false,
          actionType: "review"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SSC: {
      allowedRoles: ["CPM", "ADM"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "review"
        },
        ADM: {
          isEnabled: true,
          actionType: "review"
        }
      },
      defaultAccess: "download"
    },
    SLA: {
      allowedRoles: ["CPM", "ADM"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "review"
        },
        ADM: {
          isEnabled: true,
          actionType: "review"
        }
      },
      defaultAccess: "download"
    },
    SSA: {
      allowedRoles: ["*"],
      allowedRolesAccess: {},
      defaultAccess: "download"
    }
  },
  SQ: {
    default: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "edit"
        },
        ADM: {
          isEnabled: true,
          actionType: "edit"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SLC: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "edit"
        },
        ADM: {
          isEnabled: true,
          actionType: "edit"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SSC: {
      allowedRoles: ["*"],
      allowedRolesAccess: {},
      defaultAccess: "download"
    },
    SLA: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "edit"
        },
        ADM: {
          isEnabled: true,
          actionType: "edit"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SSA: {
      allowedRoles: ["*"],
      allowedRolesAccess: {},
      defaultAccess: "download"
    }
  },
  BQ: {
    default: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "edit"
        },
        ADM: {
          isEnabled: true,
          actionType: "edit"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SLC: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "edit"
        },
        ADM: {
          isEnabled: true,
          actionType: "edit"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SSC: {
      allowedRoles: ["*"],
      allowedRolesAccess: {},
      defaultAccess: "download"
    },
    SLA: {
      allowedRoles: ["CPM", "ADM", "CUS"],
      allowedRolesAccess: {
        CPM: {
          isEnabled: true,
          actionType: "edit"
        },
        ADM: {
          isEnabled: true,
          actionType: "edit"
        },
        CUS: {
          isEnabled: true,
          actionType: "edit"
        }
      },
      defaultAccess: "download"
    },
    SSA: {
      allowedRoles: ["*"],
      allowedRolesAccess: {},
      defaultAccess: "download"
    }
  }
};

module.exports = {
  WEBFORM_CODE,
  WEBFORM_REQUIRED_DOCUMENTS,
  WEBFORM_VALIDATION,
  WEBFORM_STATUS_MAPPING,
  WEBFORM_CODES,
  WEBFORM_STATUS
};
