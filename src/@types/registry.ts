// as come from Registry /api/artifactory
export type Image = {
    name: string;    
    createTime: {
        nanos?: number;
        seconds?: string;
    };
    updateTime: {
        nanos?: number;
        seconds?: string;
    };
    displayName: string;
};

// as come from Registry /api/artifactory/${editorRoute.repoName}
export type ImageDigest = {
    name: string;
    description: string;
    metaData: {
        fields: {
            buildTime: {
                kind: string;
                stringValue: string;
            },
            imageSizeBytes: {
                kind: string;
                stringValue: string;
            },
            mediaType: {
                kind: string;
                stringValue: string;
            },
            name: {
                kind: string;
                stringValue: string;
            },
        },
    }
    relatedTags: {
        name: string;
        version: string;
    }[],
    createTime: {
        nanos?: number;
        seconds?: string;
    };
    updateTime: {
        nanos?: number;
        seconds?: string;
    };
};