/** The actor's type. */
export var ActorType;
(function (ActorType) {
    /** Indicates a team actor. */
    ActorType["Team"] = "TEAM";
    /** Indicates a user actor. */
    ActorType["User"] = "USER";
})(ActorType || (ActorType = {}));
/** Properties by which Audit Log connections can be ordered. */
export var AuditLogOrderField;
(function (AuditLogOrderField) {
    /** Order audit log entries by timestamp */
    AuditLogOrderField["CreatedAt"] = "CREATED_AT";
})(AuditLogOrderField || (AuditLogOrderField = {}));
/** Represents an annotation's information level. */
export var CheckAnnotationLevel;
(function (CheckAnnotationLevel) {
    /** An annotation indicating an inescapable error. */
    CheckAnnotationLevel["Failure"] = "FAILURE";
    /** An annotation indicating some information. */
    CheckAnnotationLevel["Notice"] = "NOTICE";
    /** An annotation indicating an ignorable error. */
    CheckAnnotationLevel["Warning"] = "WARNING";
})(CheckAnnotationLevel || (CheckAnnotationLevel = {}));
/** The possible states for a check suite or run conclusion. */
export var CheckConclusionState;
(function (CheckConclusionState) {
    /** The check suite or run requires action. */
    CheckConclusionState["ActionRequired"] = "ACTION_REQUIRED";
    /** The check suite or run has been cancelled. */
    CheckConclusionState["Cancelled"] = "CANCELLED";
    /** The check suite or run has failed. */
    CheckConclusionState["Failure"] = "FAILURE";
    /** The check suite or run was neutral. */
    CheckConclusionState["Neutral"] = "NEUTRAL";
    /** The check suite or run was skipped. */
    CheckConclusionState["Skipped"] = "SKIPPED";
    /** The check suite or run was marked stale by GitHub. Only GitHub can use this conclusion. */
    CheckConclusionState["Stale"] = "STALE";
    /** The check suite or run has failed at startup. */
    CheckConclusionState["StartupFailure"] = "STARTUP_FAILURE";
    /** The check suite or run has succeeded. */
    CheckConclusionState["Success"] = "SUCCESS";
    /** The check suite or run has timed out. */
    CheckConclusionState["TimedOut"] = "TIMED_OUT";
})(CheckConclusionState || (CheckConclusionState = {}));
/** The possible types of check runs. */
export var CheckRunType;
(function (CheckRunType) {
    /** Every check run available. */
    CheckRunType["All"] = "ALL";
    /** The latest check run. */
    CheckRunType["Latest"] = "LATEST";
})(CheckRunType || (CheckRunType = {}));
/** The possible states for a check suite or run status. */
export var CheckStatusState;
(function (CheckStatusState) {
    /** The check suite or run has been completed. */
    CheckStatusState["Completed"] = "COMPLETED";
    /** The check suite or run is in progress. */
    CheckStatusState["InProgress"] = "IN_PROGRESS";
    /** The check suite or run is in pending state. */
    CheckStatusState["Pending"] = "PENDING";
    /** The check suite or run has been queued. */
    CheckStatusState["Queued"] = "QUEUED";
    /** The check suite or run has been requested. */
    CheckStatusState["Requested"] = "REQUESTED";
    /** The check suite or run is in waiting state. */
    CheckStatusState["Waiting"] = "WAITING";
})(CheckStatusState || (CheckStatusState = {}));
/** Collaborators affiliation level with a subject. */
export var CollaboratorAffiliation;
(function (CollaboratorAffiliation) {
    /** All collaborators the authenticated user can see. */
    CollaboratorAffiliation["All"] = "ALL";
    /** All collaborators with permissions to an organization-owned subject, regardless of organization membership status. */
    CollaboratorAffiliation["Direct"] = "DIRECT";
    /** All outside collaborators of an organization-owned subject. */
    CollaboratorAffiliation["Outside"] = "OUTSIDE";
})(CollaboratorAffiliation || (CollaboratorAffiliation = {}));
/** A comment author association with repository. */
export var CommentAuthorAssociation;
(function (CommentAuthorAssociation) {
    /** Author has been invited to collaborate on the repository. */
    CommentAuthorAssociation["Collaborator"] = "COLLABORATOR";
    /** Author has previously committed to the repository. */
    CommentAuthorAssociation["Contributor"] = "CONTRIBUTOR";
    /** Author has not previously committed to GitHub. */
    CommentAuthorAssociation["FirstTimer"] = "FIRST_TIMER";
    /** Author has not previously committed to the repository. */
    CommentAuthorAssociation["FirstTimeContributor"] = "FIRST_TIME_CONTRIBUTOR";
    /** Author is a placeholder for an unclaimed user. */
    CommentAuthorAssociation["Mannequin"] = "MANNEQUIN";
    /** Author is a member of the organization that owns the repository. */
    CommentAuthorAssociation["Member"] = "MEMBER";
    /** Author has no association with the repository. */
    CommentAuthorAssociation["None"] = "NONE";
    /** Author is the owner of the repository. */
    CommentAuthorAssociation["Owner"] = "OWNER";
})(CommentAuthorAssociation || (CommentAuthorAssociation = {}));
/** The possible errors that will prevent a user from updating a comment. */
export var CommentCannotUpdateReason;
(function (CommentCannotUpdateReason) {
    /** Unable to create comment because repository is archived. */
    CommentCannotUpdateReason["Archived"] = "ARCHIVED";
    /** You cannot update this comment */
    CommentCannotUpdateReason["Denied"] = "DENIED";
    /** You must be the author or have write access to this repository to update this comment. */
    CommentCannotUpdateReason["InsufficientAccess"] = "INSUFFICIENT_ACCESS";
    /** Unable to create comment because issue is locked. */
    CommentCannotUpdateReason["Locked"] = "LOCKED";
    /** You must be logged in to update this comment. */
    CommentCannotUpdateReason["LoginRequired"] = "LOGIN_REQUIRED";
    /** Repository is under maintenance. */
    CommentCannotUpdateReason["Maintenance"] = "MAINTENANCE";
    /** At least one email address must be verified to update this comment. */
    CommentCannotUpdateReason["VerifiedEmailRequired"] = "VERIFIED_EMAIL_REQUIRED";
})(CommentCannotUpdateReason || (CommentCannotUpdateReason = {}));
/** Properties by which commit contribution connections can be ordered. */
export var CommitContributionOrderField;
(function (CommitContributionOrderField) {
    /** Order commit contributions by how many commits they represent. */
    CommitContributionOrderField["CommitCount"] = "COMMIT_COUNT";
    /** Order commit contributions by when they were made. */
    CommitContributionOrderField["OccurredAt"] = "OCCURRED_AT";
})(CommitContributionOrderField || (CommitContributionOrderField = {}));
/** Varying levels of contributions from none to many. */
export var ContributionLevel;
(function (ContributionLevel) {
    /** Lowest 25% of days of contributions. */
    ContributionLevel["FirstQuartile"] = "FIRST_QUARTILE";
    /** Highest 25% of days of contributions. More contributions than the third quartile. */
    ContributionLevel["FourthQuartile"] = "FOURTH_QUARTILE";
    /** No contributions occurred. */
    ContributionLevel["None"] = "NONE";
    /** Second lowest 25% of days of contributions. More contributions than the first quartile. */
    ContributionLevel["SecondQuartile"] = "SECOND_QUARTILE";
    /** Second highest 25% of days of contributions. More contributions than second quartile, less than the fourth quartile. */
    ContributionLevel["ThirdQuartile"] = "THIRD_QUARTILE";
})(ContributionLevel || (ContributionLevel = {}));
/** The possible base permissions for repositories. */
export var DefaultRepositoryPermissionField;
(function (DefaultRepositoryPermissionField) {
    /** Can read, write, and administrate repos by default */
    DefaultRepositoryPermissionField["Admin"] = "ADMIN";
    /** No access */
    DefaultRepositoryPermissionField["None"] = "NONE";
    /** Can read repos by default */
    DefaultRepositoryPermissionField["Read"] = "READ";
    /** Can read and write repos by default */
    DefaultRepositoryPermissionField["Write"] = "WRITE";
})(DefaultRepositoryPermissionField || (DefaultRepositoryPermissionField = {}));
/** The possible ecosystems of a dependency graph package. */
export var DependencyGraphEcosystem;
(function (DependencyGraphEcosystem) {
    /** GitHub Actions */
    DependencyGraphEcosystem["Actions"] = "ACTIONS";
    /** PHP packages hosted at packagist.org */
    DependencyGraphEcosystem["Composer"] = "COMPOSER";
    /** Go modules */
    DependencyGraphEcosystem["Go"] = "GO";
    /** Java artifacts hosted at the Maven central repository */
    DependencyGraphEcosystem["Maven"] = "MAVEN";
    /** JavaScript packages hosted at npmjs.com */
    DependencyGraphEcosystem["Npm"] = "NPM";
    /** .NET packages hosted at the NuGet Gallery */
    DependencyGraphEcosystem["Nuget"] = "NUGET";
    /** Python packages hosted at PyPI.org */
    DependencyGraphEcosystem["Pip"] = "PIP";
    /** Ruby gems hosted at RubyGems.org */
    DependencyGraphEcosystem["Rubygems"] = "RUBYGEMS";
    /** Rust crates */
    DependencyGraphEcosystem["Rust"] = "RUST";
})(DependencyGraphEcosystem || (DependencyGraphEcosystem = {}));
/** Properties by which deployment connections can be ordered. */
export var DeploymentOrderField;
(function (DeploymentOrderField) {
    /** Order collection by creation time */
    DeploymentOrderField["CreatedAt"] = "CREATED_AT";
})(DeploymentOrderField || (DeploymentOrderField = {}));
/** The possible protection rule types. */
export var DeploymentProtectionRuleType;
(function (DeploymentProtectionRuleType) {
    /** Required reviewers */
    DeploymentProtectionRuleType["RequiredReviewers"] = "REQUIRED_REVIEWERS";
    /** Wait timer */
    DeploymentProtectionRuleType["WaitTimer"] = "WAIT_TIMER";
})(DeploymentProtectionRuleType || (DeploymentProtectionRuleType = {}));
/** The possible states for a deployment review. */
export var DeploymentReviewState;
(function (DeploymentReviewState) {
    /** The deployment was approved. */
    DeploymentReviewState["Approved"] = "APPROVED";
    /** The deployment was rejected. */
    DeploymentReviewState["Rejected"] = "REJECTED";
})(DeploymentReviewState || (DeploymentReviewState = {}));
/** The possible states in which a deployment can be. */
export var DeploymentState;
(function (DeploymentState) {
    /** The pending deployment was not updated after 30 minutes. */
    DeploymentState["Abandoned"] = "ABANDONED";
    /** The deployment is currently active. */
    DeploymentState["Active"] = "ACTIVE";
    /** An inactive transient deployment. */
    DeploymentState["Destroyed"] = "DESTROYED";
    /** The deployment experienced an error. */
    DeploymentState["Error"] = "ERROR";
    /** The deployment has failed. */
    DeploymentState["Failure"] = "FAILURE";
    /** The deployment is inactive. */
    DeploymentState["Inactive"] = "INACTIVE";
    /** The deployment is in progress. */
    DeploymentState["InProgress"] = "IN_PROGRESS";
    /** The deployment is pending. */
    DeploymentState["Pending"] = "PENDING";
    /** The deployment has queued */
    DeploymentState["Queued"] = "QUEUED";
    /** The deployment is waiting. */
    DeploymentState["Waiting"] = "WAITING";
})(DeploymentState || (DeploymentState = {}));
/** The possible states for a deployment status. */
export var DeploymentStatusState;
(function (DeploymentStatusState) {
    /** The deployment experienced an error. */
    DeploymentStatusState["Error"] = "ERROR";
    /** The deployment has failed. */
    DeploymentStatusState["Failure"] = "FAILURE";
    /** The deployment is inactive. */
    DeploymentStatusState["Inactive"] = "INACTIVE";
    /** The deployment is in progress. */
    DeploymentStatusState["InProgress"] = "IN_PROGRESS";
    /** The deployment is pending. */
    DeploymentStatusState["Pending"] = "PENDING";
    /** The deployment is queued */
    DeploymentStatusState["Queued"] = "QUEUED";
    /** The deployment was successful. */
    DeploymentStatusState["Success"] = "SUCCESS";
    /** The deployment is waiting. */
    DeploymentStatusState["Waiting"] = "WAITING";
})(DeploymentStatusState || (DeploymentStatusState = {}));
/** The possible sides of a diff. */
export var DiffSide;
(function (DiffSide) {
    /** The left side of the diff. */
    DiffSide["Left"] = "LEFT";
    /** The right side of the diff. */
    DiffSide["Right"] = "RIGHT";
})(DiffSide || (DiffSide = {}));
/** Properties by which discussion connections can be ordered. */
export var DiscussionOrderField;
(function (DiscussionOrderField) {
    /** Order discussions by creation time. */
    DiscussionOrderField["CreatedAt"] = "CREATED_AT";
    /** Order discussions by most recent modification time. */
    DiscussionOrderField["UpdatedAt"] = "UPDATED_AT";
})(DiscussionOrderField || (DiscussionOrderField = {}));
/** Properties by which discussion poll option connections can be ordered. */
export var DiscussionPollOptionOrderField;
(function (DiscussionPollOptionOrderField) {
    /** Order poll options by the order that the poll author specified when creating the poll. */
    DiscussionPollOptionOrderField["AuthoredOrder"] = "AUTHORED_ORDER";
    /** Order poll options by the number of votes it has. */
    DiscussionPollOptionOrderField["VoteCount"] = "VOTE_COUNT";
})(DiscussionPollOptionOrderField || (DiscussionPollOptionOrderField = {}));
/** The possible reasons that a Dependabot alert was dismissed. */
export var DismissReason;
(function (DismissReason) {
    /** A fix has already been started */
    DismissReason["FixStarted"] = "FIX_STARTED";
    /** This alert is inaccurate or incorrect */
    DismissReason["Inaccurate"] = "INACCURATE";
    /** Vulnerable code is not actually used */
    DismissReason["NotUsed"] = "NOT_USED";
    /** No bandwidth to fix this */
    DismissReason["NoBandwidth"] = "NO_BANDWIDTH";
    /** Risk is tolerable to this project */
    DismissReason["TolerableRisk"] = "TOLERABLE_RISK";
})(DismissReason || (DismissReason = {}));
/** Properties by which enterprise administrator invitation connections can be ordered. */
export var EnterpriseAdministratorInvitationOrderField;
(function (EnterpriseAdministratorInvitationOrderField) {
    /** Order enterprise administrator member invitations by creation time */
    EnterpriseAdministratorInvitationOrderField["CreatedAt"] = "CREATED_AT";
})(EnterpriseAdministratorInvitationOrderField || (EnterpriseAdministratorInvitationOrderField = {}));
/** The possible administrator roles in an enterprise account. */
export var EnterpriseAdministratorRole;
(function (EnterpriseAdministratorRole) {
    /** Represents a billing manager of the enterprise account. */
    EnterpriseAdministratorRole["BillingManager"] = "BILLING_MANAGER";
    /** Represents an owner of the enterprise account. */
    EnterpriseAdministratorRole["Owner"] = "OWNER";
})(EnterpriseAdministratorRole || (EnterpriseAdministratorRole = {}));
/** The possible values for the enterprise base repository permission setting. */
export var EnterpriseDefaultRepositoryPermissionSettingValue;
(function (EnterpriseDefaultRepositoryPermissionSettingValue) {
    /** Organization members will be able to clone, pull, push, and add new collaborators to all organization repositories. */
    EnterpriseDefaultRepositoryPermissionSettingValue["Admin"] = "ADMIN";
    /** Organization members will only be able to clone and pull public repositories. */
    EnterpriseDefaultRepositoryPermissionSettingValue["None"] = "NONE";
    /** Organizations in the enterprise choose base repository permissions for their members. */
    EnterpriseDefaultRepositoryPermissionSettingValue["NoPolicy"] = "NO_POLICY";
    /** Organization members will be able to clone and pull all organization repositories. */
    EnterpriseDefaultRepositoryPermissionSettingValue["Read"] = "READ";
    /** Organization members will be able to clone, pull, and push all organization repositories. */
    EnterpriseDefaultRepositoryPermissionSettingValue["Write"] = "WRITE";
})(EnterpriseDefaultRepositoryPermissionSettingValue || (EnterpriseDefaultRepositoryPermissionSettingValue = {}));
/** The possible values for an enabled/disabled enterprise setting. */
export var EnterpriseEnabledDisabledSettingValue;
(function (EnterpriseEnabledDisabledSettingValue) {
    /** The setting is disabled for organizations in the enterprise. */
    EnterpriseEnabledDisabledSettingValue["Disabled"] = "DISABLED";
    /** The setting is enabled for organizations in the enterprise. */
    EnterpriseEnabledDisabledSettingValue["Enabled"] = "ENABLED";
    /** There is no policy set for organizations in the enterprise. */
    EnterpriseEnabledDisabledSettingValue["NoPolicy"] = "NO_POLICY";
})(EnterpriseEnabledDisabledSettingValue || (EnterpriseEnabledDisabledSettingValue = {}));
/** The possible values for an enabled/no policy enterprise setting. */
export var EnterpriseEnabledSettingValue;
(function (EnterpriseEnabledSettingValue) {
    /** The setting is enabled for organizations in the enterprise. */
    EnterpriseEnabledSettingValue["Enabled"] = "ENABLED";
    /** There is no policy set for organizations in the enterprise. */
    EnterpriseEnabledSettingValue["NoPolicy"] = "NO_POLICY";
})(EnterpriseEnabledSettingValue || (EnterpriseEnabledSettingValue = {}));
/** Properties by which enterprise member connections can be ordered. */
export var EnterpriseMemberOrderField;
(function (EnterpriseMemberOrderField) {
    /** Order enterprise members by creation time */
    EnterpriseMemberOrderField["CreatedAt"] = "CREATED_AT";
    /** Order enterprise members by login */
    EnterpriseMemberOrderField["Login"] = "LOGIN";
})(EnterpriseMemberOrderField || (EnterpriseMemberOrderField = {}));
/** The possible values for the enterprise members can create repositories setting. */
export var EnterpriseMembersCanCreateRepositoriesSettingValue;
(function (EnterpriseMembersCanCreateRepositoriesSettingValue) {
    /** Members will be able to create public and private repositories. */
    EnterpriseMembersCanCreateRepositoriesSettingValue["All"] = "ALL";
    /** Members will not be able to create public or private repositories. */
    EnterpriseMembersCanCreateRepositoriesSettingValue["Disabled"] = "DISABLED";
    /** Organization administrators choose whether to allow members to create repositories. */
    EnterpriseMembersCanCreateRepositoriesSettingValue["NoPolicy"] = "NO_POLICY";
    /** Members will be able to create only private repositories. */
    EnterpriseMembersCanCreateRepositoriesSettingValue["Private"] = "PRIVATE";
    /** Members will be able to create only public repositories. */
    EnterpriseMembersCanCreateRepositoriesSettingValue["Public"] = "PUBLIC";
})(EnterpriseMembersCanCreateRepositoriesSettingValue || (EnterpriseMembersCanCreateRepositoriesSettingValue = {}));
/** The possible values for the members can make purchases setting. */
export var EnterpriseMembersCanMakePurchasesSettingValue;
(function (EnterpriseMembersCanMakePurchasesSettingValue) {
    /** The setting is disabled for organizations in the enterprise. */
    EnterpriseMembersCanMakePurchasesSettingValue["Disabled"] = "DISABLED";
    /** The setting is enabled for organizations in the enterprise. */
    EnterpriseMembersCanMakePurchasesSettingValue["Enabled"] = "ENABLED";
})(EnterpriseMembersCanMakePurchasesSettingValue || (EnterpriseMembersCanMakePurchasesSettingValue = {}));
/** Properties by which Enterprise Server installation connections can be ordered. */
export var EnterpriseServerInstallationOrderField;
(function (EnterpriseServerInstallationOrderField) {
    /** Order Enterprise Server installations by creation time */
    EnterpriseServerInstallationOrderField["CreatedAt"] = "CREATED_AT";
    /** Order Enterprise Server installations by customer name */
    EnterpriseServerInstallationOrderField["CustomerName"] = "CUSTOMER_NAME";
    /** Order Enterprise Server installations by host name */
    EnterpriseServerInstallationOrderField["HostName"] = "HOST_NAME";
})(EnterpriseServerInstallationOrderField || (EnterpriseServerInstallationOrderField = {}));
/** Properties by which Enterprise Server user account email connections can be ordered. */
export var EnterpriseServerUserAccountEmailOrderField;
(function (EnterpriseServerUserAccountEmailOrderField) {
    /** Order emails by email */
    EnterpriseServerUserAccountEmailOrderField["Email"] = "EMAIL";
})(EnterpriseServerUserAccountEmailOrderField || (EnterpriseServerUserAccountEmailOrderField = {}));
/** Properties by which Enterprise Server user account connections can be ordered. */
export var EnterpriseServerUserAccountOrderField;
(function (EnterpriseServerUserAccountOrderField) {
    /** Order user accounts by login */
    EnterpriseServerUserAccountOrderField["Login"] = "LOGIN";
    /** Order user accounts by creation time on the Enterprise Server installation */
    EnterpriseServerUserAccountOrderField["RemoteCreatedAt"] = "REMOTE_CREATED_AT";
})(EnterpriseServerUserAccountOrderField || (EnterpriseServerUserAccountOrderField = {}));
/** Properties by which Enterprise Server user accounts upload connections can be ordered. */
export var EnterpriseServerUserAccountsUploadOrderField;
(function (EnterpriseServerUserAccountsUploadOrderField) {
    /** Order user accounts uploads by creation time */
    EnterpriseServerUserAccountsUploadOrderField["CreatedAt"] = "CREATED_AT";
})(EnterpriseServerUserAccountsUploadOrderField || (EnterpriseServerUserAccountsUploadOrderField = {}));
/** Synchronization state of the Enterprise Server user accounts upload */
export var EnterpriseServerUserAccountsUploadSyncState;
(function (EnterpriseServerUserAccountsUploadSyncState) {
    /** The synchronization of the upload failed. */
    EnterpriseServerUserAccountsUploadSyncState["Failure"] = "FAILURE";
    /** The synchronization of the upload is pending. */
    EnterpriseServerUserAccountsUploadSyncState["Pending"] = "PENDING";
    /** The synchronization of the upload succeeded. */
    EnterpriseServerUserAccountsUploadSyncState["Success"] = "SUCCESS";
})(EnterpriseServerUserAccountsUploadSyncState || (EnterpriseServerUserAccountsUploadSyncState = {}));
/** The possible roles for enterprise membership. */
export var EnterpriseUserAccountMembershipRole;
(function (EnterpriseUserAccountMembershipRole) {
    /** The user is a member of an organization in the enterprise. */
    EnterpriseUserAccountMembershipRole["Member"] = "MEMBER";
    /** The user is an owner of an organization in the enterprise. */
    EnterpriseUserAccountMembershipRole["Owner"] = "OWNER";
    /**
     * The user is not an owner of the enterprise, and not a member or owner of any
     * organizations in the enterprise; only for EMU-enabled enterprises.
     */
    EnterpriseUserAccountMembershipRole["Unaffiliated"] = "UNAFFILIATED";
})(EnterpriseUserAccountMembershipRole || (EnterpriseUserAccountMembershipRole = {}));
/** The possible GitHub Enterprise deployments where this user can exist. */
export var EnterpriseUserDeployment;
(function (EnterpriseUserDeployment) {
    /** The user is part of a GitHub Enterprise Cloud deployment. */
    EnterpriseUserDeployment["Cloud"] = "CLOUD";
    /** The user is part of a GitHub Enterprise Server deployment. */
    EnterpriseUserDeployment["Server"] = "SERVER";
})(EnterpriseUserDeployment || (EnterpriseUserDeployment = {}));
/** The possible viewed states of a file . */
export var FileViewedState;
(function (FileViewedState) {
    /** The file has new changes since last viewed. */
    FileViewedState["Dismissed"] = "DISMISSED";
    /** The file has not been marked as viewed. */
    FileViewedState["Unviewed"] = "UNVIEWED";
    /** The file has been marked as viewed. */
    FileViewedState["Viewed"] = "VIEWED";
})(FileViewedState || (FileViewedState = {}));
/** The possible funding platforms for repository funding links. */
export var FundingPlatform;
(function (FundingPlatform) {
    /** Community Bridge funding platform. */
    FundingPlatform["CommunityBridge"] = "COMMUNITY_BRIDGE";
    /** Custom funding platform. */
    FundingPlatform["Custom"] = "CUSTOM";
    /** GitHub funding platform. */
    FundingPlatform["Github"] = "GITHUB";
    /** IssueHunt funding platform. */
    FundingPlatform["Issuehunt"] = "ISSUEHUNT";
    /** Ko-fi funding platform. */
    FundingPlatform["KoFi"] = "KO_FI";
    /** LFX Crowdfunding funding platform. */
    FundingPlatform["LfxCrowdfunding"] = "LFX_CROWDFUNDING";
    /** Liberapay funding platform. */
    FundingPlatform["Liberapay"] = "LIBERAPAY";
    /** Open Collective funding platform. */
    FundingPlatform["OpenCollective"] = "OPEN_COLLECTIVE";
    /** Otechie funding platform. */
    FundingPlatform["Otechie"] = "OTECHIE";
    /** Patreon funding platform. */
    FundingPlatform["Patreon"] = "PATREON";
    /** Tidelift funding platform. */
    FundingPlatform["Tidelift"] = "TIDELIFT";
})(FundingPlatform || (FundingPlatform = {}));
/** Properties by which gist connections can be ordered. */
export var GistOrderField;
(function (GistOrderField) {
    /** Order gists by creation time */
    GistOrderField["CreatedAt"] = "CREATED_AT";
    /** Order gists by push time */
    GistOrderField["PushedAt"] = "PUSHED_AT";
    /** Order gists by update time */
    GistOrderField["UpdatedAt"] = "UPDATED_AT";
})(GistOrderField || (GistOrderField = {}));
/** The privacy of a Gist */
export var GistPrivacy;
(function (GistPrivacy) {
    /** Gists that are public and secret */
    GistPrivacy["All"] = "ALL";
    /** Public */
    GistPrivacy["Public"] = "PUBLIC";
    /** Secret */
    GistPrivacy["Secret"] = "SECRET";
})(GistPrivacy || (GistPrivacy = {}));
/** The state of a Git signature. */
export var GitSignatureState;
(function (GitSignatureState) {
    /** The signing certificate or its chain could not be verified */
    GitSignatureState["BadCert"] = "BAD_CERT";
    /** Invalid email used for signing */
    GitSignatureState["BadEmail"] = "BAD_EMAIL";
    /** Signing key expired */
    GitSignatureState["ExpiredKey"] = "EXPIRED_KEY";
    /** Internal error - the GPG verification service misbehaved */
    GitSignatureState["GpgverifyError"] = "GPGVERIFY_ERROR";
    /** Internal error - the GPG verification service is unavailable at the moment */
    GitSignatureState["GpgverifyUnavailable"] = "GPGVERIFY_UNAVAILABLE";
    /** Invalid signature */
    GitSignatureState["Invalid"] = "INVALID";
    /** Malformed signature */
    GitSignatureState["MalformedSig"] = "MALFORMED_SIG";
    /** The usage flags for the key that signed this don't allow signing */
    GitSignatureState["NotSigningKey"] = "NOT_SIGNING_KEY";
    /** Email used for signing not known to GitHub */
    GitSignatureState["NoUser"] = "NO_USER";
    /** Valid signature, though certificate revocation check failed */
    GitSignatureState["OcspError"] = "OCSP_ERROR";
    /** Valid signature, pending certificate revocation checking */
    GitSignatureState["OcspPending"] = "OCSP_PENDING";
    /** One or more certificates in chain has been revoked */
    GitSignatureState["OcspRevoked"] = "OCSP_REVOKED";
    /** Key used for signing not known to GitHub */
    GitSignatureState["UnknownKey"] = "UNKNOWN_KEY";
    /** Unknown signature type */
    GitSignatureState["UnknownSigType"] = "UNKNOWN_SIG_TYPE";
    /** Unsigned */
    GitSignatureState["Unsigned"] = "UNSIGNED";
    /** Email used for signing unverified on GitHub */
    GitSignatureState["UnverifiedEmail"] = "UNVERIFIED_EMAIL";
    /** Valid signature and verified by GitHub */
    GitSignatureState["Valid"] = "VALID";
})(GitSignatureState || (GitSignatureState = {}));
/** The possible states in which authentication can be configured with an identity provider. */
export var IdentityProviderConfigurationState;
(function (IdentityProviderConfigurationState) {
    /** Authentication with an identity provider is configured but not enforced. */
    IdentityProviderConfigurationState["Configured"] = "CONFIGURED";
    /** Authentication with an identity provider is configured and enforced. */
    IdentityProviderConfigurationState["Enforced"] = "ENFORCED";
    /** Authentication with an identity provider is not configured. */
    IdentityProviderConfigurationState["Unconfigured"] = "UNCONFIGURED";
})(IdentityProviderConfigurationState || (IdentityProviderConfigurationState = {}));
/** The possible values for the IP allow list enabled setting. */
export var IpAllowListEnabledSettingValue;
(function (IpAllowListEnabledSettingValue) {
    /** The setting is disabled for the owner. */
    IpAllowListEnabledSettingValue["Disabled"] = "DISABLED";
    /** The setting is enabled for the owner. */
    IpAllowListEnabledSettingValue["Enabled"] = "ENABLED";
})(IpAllowListEnabledSettingValue || (IpAllowListEnabledSettingValue = {}));
/** Properties by which IP allow list entry connections can be ordered. */
export var IpAllowListEntryOrderField;
(function (IpAllowListEntryOrderField) {
    /** Order IP allow list entries by the allow list value. */
    IpAllowListEntryOrderField["AllowListValue"] = "ALLOW_LIST_VALUE";
    /** Order IP allow list entries by creation time. */
    IpAllowListEntryOrderField["CreatedAt"] = "CREATED_AT";
})(IpAllowListEntryOrderField || (IpAllowListEntryOrderField = {}));
/** The possible values for the IP allow list configuration for installed GitHub Apps setting. */
export var IpAllowListForInstalledAppsEnabledSettingValue;
(function (IpAllowListForInstalledAppsEnabledSettingValue) {
    /** The setting is disabled for the owner. */
    IpAllowListForInstalledAppsEnabledSettingValue["Disabled"] = "DISABLED";
    /** The setting is enabled for the owner. */
    IpAllowListForInstalledAppsEnabledSettingValue["Enabled"] = "ENABLED";
})(IpAllowListForInstalledAppsEnabledSettingValue || (IpAllowListForInstalledAppsEnabledSettingValue = {}));
/** The possible state reasons of a closed issue. */
export var IssueClosedStateReason;
(function (IssueClosedStateReason) {
    /** An issue that has been closed as completed */
    IssueClosedStateReason["Completed"] = "COMPLETED";
    /** An issue that has been closed as not planned */
    IssueClosedStateReason["NotPlanned"] = "NOT_PLANNED";
})(IssueClosedStateReason || (IssueClosedStateReason = {}));
/** Properties by which issue comment connections can be ordered. */
export var IssueCommentOrderField;
(function (IssueCommentOrderField) {
    /** Order issue comments by update time */
    IssueCommentOrderField["UpdatedAt"] = "UPDATED_AT";
})(IssueCommentOrderField || (IssueCommentOrderField = {}));
/** Properties by which issue connections can be ordered. */
export var IssueOrderField;
(function (IssueOrderField) {
    /** Order issues by comment count */
    IssueOrderField["Comments"] = "COMMENTS";
    /** Order issues by creation time */
    IssueOrderField["CreatedAt"] = "CREATED_AT";
    /** Order issues by update time */
    IssueOrderField["UpdatedAt"] = "UPDATED_AT";
})(IssueOrderField || (IssueOrderField = {}));
/** The possible states of an issue. */
export var IssueState;
(function (IssueState) {
    /** An issue that has been closed */
    IssueState["Closed"] = "CLOSED";
    /** An issue that is still open */
    IssueState["Open"] = "OPEN";
})(IssueState || (IssueState = {}));
/** The possible state reasons of an issue. */
export var IssueStateReason;
(function (IssueStateReason) {
    /** An issue that has been closed as completed */
    IssueStateReason["Completed"] = "COMPLETED";
    /** An issue that has been closed as not planned */
    IssueStateReason["NotPlanned"] = "NOT_PLANNED";
    /** An issue that has been reopened */
    IssueStateReason["Reopened"] = "REOPENED";
})(IssueStateReason || (IssueStateReason = {}));
/** The possible item types found in a timeline. */
export var IssueTimelineItemsItemType;
(function (IssueTimelineItemsItemType) {
    /** Represents a 'added_to_project' event on a given issue or pull request. */
    IssueTimelineItemsItemType["AddedToProjectEvent"] = "ADDED_TO_PROJECT_EVENT";
    /** Represents an 'assigned' event on any assignable object. */
    IssueTimelineItemsItemType["AssignedEvent"] = "ASSIGNED_EVENT";
    /** Represents a 'closed' event on any `Closable`. */
    IssueTimelineItemsItemType["ClosedEvent"] = "CLOSED_EVENT";
    /** Represents a 'comment_deleted' event on a given issue or pull request. */
    IssueTimelineItemsItemType["CommentDeletedEvent"] = "COMMENT_DELETED_EVENT";
    /** Represents a 'connected' event on a given issue or pull request. */
    IssueTimelineItemsItemType["ConnectedEvent"] = "CONNECTED_EVENT";
    /** Represents a 'converted_note_to_issue' event on a given issue or pull request. */
    IssueTimelineItemsItemType["ConvertedNoteToIssueEvent"] = "CONVERTED_NOTE_TO_ISSUE_EVENT";
    /** Represents a 'converted_to_discussion' event on a given issue. */
    IssueTimelineItemsItemType["ConvertedToDiscussionEvent"] = "CONVERTED_TO_DISCUSSION_EVENT";
    /** Represents a mention made by one issue or pull request to another. */
    IssueTimelineItemsItemType["CrossReferencedEvent"] = "CROSS_REFERENCED_EVENT";
    /** Represents a 'demilestoned' event on a given issue or pull request. */
    IssueTimelineItemsItemType["DemilestonedEvent"] = "DEMILESTONED_EVENT";
    /** Represents a 'disconnected' event on a given issue or pull request. */
    IssueTimelineItemsItemType["DisconnectedEvent"] = "DISCONNECTED_EVENT";
    /** Represents a comment on an Issue. */
    IssueTimelineItemsItemType["IssueComment"] = "ISSUE_COMMENT";
    /** Represents a 'labeled' event on a given issue or pull request. */
    IssueTimelineItemsItemType["LabeledEvent"] = "LABELED_EVENT";
    /** Represents a 'locked' event on a given issue or pull request. */
    IssueTimelineItemsItemType["LockedEvent"] = "LOCKED_EVENT";
    /** Represents a 'marked_as_duplicate' event on a given issue or pull request. */
    IssueTimelineItemsItemType["MarkedAsDuplicateEvent"] = "MARKED_AS_DUPLICATE_EVENT";
    /** Represents a 'mentioned' event on a given issue or pull request. */
    IssueTimelineItemsItemType["MentionedEvent"] = "MENTIONED_EVENT";
    /** Represents a 'milestoned' event on a given issue or pull request. */
    IssueTimelineItemsItemType["MilestonedEvent"] = "MILESTONED_EVENT";
    /** Represents a 'moved_columns_in_project' event on a given issue or pull request. */
    IssueTimelineItemsItemType["MovedColumnsInProjectEvent"] = "MOVED_COLUMNS_IN_PROJECT_EVENT";
    /** Represents a 'pinned' event on a given issue or pull request. */
    IssueTimelineItemsItemType["PinnedEvent"] = "PINNED_EVENT";
    /** Represents a 'referenced' event on a given `ReferencedSubject`. */
    IssueTimelineItemsItemType["ReferencedEvent"] = "REFERENCED_EVENT";
    /** Represents a 'removed_from_project' event on a given issue or pull request. */
    IssueTimelineItemsItemType["RemovedFromProjectEvent"] = "REMOVED_FROM_PROJECT_EVENT";
    /** Represents a 'renamed' event on a given issue or pull request */
    IssueTimelineItemsItemType["RenamedTitleEvent"] = "RENAMED_TITLE_EVENT";
    /** Represents a 'reopened' event on any `Closable`. */
    IssueTimelineItemsItemType["ReopenedEvent"] = "REOPENED_EVENT";
    /** Represents a 'subscribed' event on a given `Subscribable`. */
    IssueTimelineItemsItemType["SubscribedEvent"] = "SUBSCRIBED_EVENT";
    /** Represents a 'transferred' event on a given issue or pull request. */
    IssueTimelineItemsItemType["TransferredEvent"] = "TRANSFERRED_EVENT";
    /** Represents an 'unassigned' event on any assignable object. */
    IssueTimelineItemsItemType["UnassignedEvent"] = "UNASSIGNED_EVENT";
    /** Represents an 'unlabeled' event on a given issue or pull request. */
    IssueTimelineItemsItemType["UnlabeledEvent"] = "UNLABELED_EVENT";
    /** Represents an 'unlocked' event on a given issue or pull request. */
    IssueTimelineItemsItemType["UnlockedEvent"] = "UNLOCKED_EVENT";
    /** Represents an 'unmarked_as_duplicate' event on a given issue or pull request. */
    IssueTimelineItemsItemType["UnmarkedAsDuplicateEvent"] = "UNMARKED_AS_DUPLICATE_EVENT";
    /** Represents an 'unpinned' event on a given issue or pull request. */
    IssueTimelineItemsItemType["UnpinnedEvent"] = "UNPINNED_EVENT";
    /** Represents an 'unsubscribed' event on a given `Subscribable`. */
    IssueTimelineItemsItemType["UnsubscribedEvent"] = "UNSUBSCRIBED_EVENT";
    /** Represents a 'user_blocked' event on a given user. */
    IssueTimelineItemsItemType["UserBlockedEvent"] = "USER_BLOCKED_EVENT";
})(IssueTimelineItemsItemType || (IssueTimelineItemsItemType = {}));
/** Properties by which label connections can be ordered. */
export var LabelOrderField;
(function (LabelOrderField) {
    /** Order labels by creation time */
    LabelOrderField["CreatedAt"] = "CREATED_AT";
    /** Order labels by name */
    LabelOrderField["Name"] = "NAME";
})(LabelOrderField || (LabelOrderField = {}));
/** Properties by which language connections can be ordered. */
export var LanguageOrderField;
(function (LanguageOrderField) {
    /** Order languages by the size of all files containing the language */
    LanguageOrderField["Size"] = "SIZE";
})(LanguageOrderField || (LanguageOrderField = {}));
/** The possible reasons that an issue or pull request was locked. */
export var LockReason;
(function (LockReason) {
    /** The issue or pull request was locked because the conversation was off-topic. */
    LockReason["OffTopic"] = "OFF_TOPIC";
    /** The issue or pull request was locked because the conversation was resolved. */
    LockReason["Resolved"] = "RESOLVED";
    /** The issue or pull request was locked because the conversation was spam. */
    LockReason["Spam"] = "SPAM";
    /** The issue or pull request was locked because the conversation was too heated. */
    LockReason["TooHeated"] = "TOO_HEATED";
})(LockReason || (LockReason = {}));
/** Detailed status information about a pull request merge. */
export var MergeStateStatus;
(function (MergeStateStatus) {
    /** The head ref is out of date. */
    MergeStateStatus["Behind"] = "BEHIND";
    /** The merge is blocked. */
    MergeStateStatus["Blocked"] = "BLOCKED";
    /** Mergeable and passing commit status. */
    MergeStateStatus["Clean"] = "CLEAN";
    /** The merge commit cannot be cleanly created. */
    MergeStateStatus["Dirty"] = "DIRTY";
    /**
     * The merge is blocked due to the pull request being a draft.
     * @deprecated DRAFT state will be removed from this enum and `isDraft` should be used instead Use PullRequest.isDraft instead. Removal on 2021-01-01 UTC.
     */
    MergeStateStatus["Draft"] = "DRAFT";
    /** Mergeable with passing commit status and pre-receive hooks. */
    MergeStateStatus["HasHooks"] = "HAS_HOOKS";
    /** The state cannot currently be determined. */
    MergeStateStatus["Unknown"] = "UNKNOWN";
    /** Mergeable with non-passing commit status. */
    MergeStateStatus["Unstable"] = "UNSTABLE";
})(MergeStateStatus || (MergeStateStatus = {}));
/** Whether or not a PullRequest can be merged. */
export var MergeableState;
(function (MergeableState) {
    /** The pull request cannot be merged due to merge conflicts. */
    MergeableState["Conflicting"] = "CONFLICTING";
    /** The pull request can be merged. */
    MergeableState["Mergeable"] = "MERGEABLE";
    /** The mergeability of the pull request is still being calculated. */
    MergeableState["Unknown"] = "UNKNOWN";
})(MergeableState || (MergeableState = {}));
/** Represents the different Octoshift migration sources. */
export var MigrationSourceType;
(function (MigrationSourceType) {
    /** An Azure DevOps migration source. */
    MigrationSourceType["AzureDevops"] = "AZURE_DEVOPS";
    /** A Bitbucket Server migration source. */
    MigrationSourceType["BitbucketServer"] = "BITBUCKET_SERVER";
    /** A GitHub Migration API source. */
    MigrationSourceType["GithubArchive"] = "GITHUB_ARCHIVE";
})(MigrationSourceType || (MigrationSourceType = {}));
/** The Octoshift migration state. */
export var MigrationState;
(function (MigrationState) {
    /** The Octoshift migration has failed. */
    MigrationState["Failed"] = "FAILED";
    /** The Octoshift migration has invalid credentials. */
    MigrationState["FailedValidation"] = "FAILED_VALIDATION";
    /** The Octoshift migration is in progress. */
    MigrationState["InProgress"] = "IN_PROGRESS";
    /** The Octoshift migration has not started. */
    MigrationState["NotStarted"] = "NOT_STARTED";
    /** The Octoshift migration needs to have its credentials validated. */
    MigrationState["PendingValidation"] = "PENDING_VALIDATION";
    /** The Octoshift migration has been queued. */
    MigrationState["Queued"] = "QUEUED";
    /** The Octoshift migration has succeeded. */
    MigrationState["Succeeded"] = "SUCCEEDED";
})(MigrationState || (MigrationState = {}));
/** Properties by which milestone connections can be ordered. */
export var MilestoneOrderField;
(function (MilestoneOrderField) {
    /** Order milestones by when they were created. */
    MilestoneOrderField["CreatedAt"] = "CREATED_AT";
    /** Order milestones by when they are due. */
    MilestoneOrderField["DueDate"] = "DUE_DATE";
    /** Order milestones by their number. */
    MilestoneOrderField["Number"] = "NUMBER";
    /** Order milestones by when they were last updated. */
    MilestoneOrderField["UpdatedAt"] = "UPDATED_AT";
})(MilestoneOrderField || (MilestoneOrderField = {}));
/** The possible states of a milestone. */
export var MilestoneState;
(function (MilestoneState) {
    /** A milestone that has been closed. */
    MilestoneState["Closed"] = "CLOSED";
    /** A milestone that is still open. */
    MilestoneState["Open"] = "OPEN";
})(MilestoneState || (MilestoneState = {}));
/** The possible values for the notification restriction setting. */
export var NotificationRestrictionSettingValue;
(function (NotificationRestrictionSettingValue) {
    /** The setting is disabled for the owner. */
    NotificationRestrictionSettingValue["Disabled"] = "DISABLED";
    /** The setting is enabled for the owner. */
    NotificationRestrictionSettingValue["Enabled"] = "ENABLED";
})(NotificationRestrictionSettingValue || (NotificationRestrictionSettingValue = {}));
/** The OIDC identity provider type */
export var OidcProviderType;
(function (OidcProviderType) {
    /** Azure Active Directory */
    OidcProviderType["Aad"] = "AAD";
})(OidcProviderType || (OidcProviderType = {}));
/** The state of an OAuth Application when it was created. */
export var OauthApplicationCreateAuditEntryState;
(function (OauthApplicationCreateAuditEntryState) {
    /** The OAuth Application was active and allowed to have OAuth Accesses. */
    OauthApplicationCreateAuditEntryState["Active"] = "ACTIVE";
    /** The OAuth Application was in the process of being deleted. */
    OauthApplicationCreateAuditEntryState["PendingDeletion"] = "PENDING_DELETION";
    /** The OAuth Application was suspended from generating OAuth Accesses due to abuse or security concerns. */
    OauthApplicationCreateAuditEntryState["Suspended"] = "SUSPENDED";
})(OauthApplicationCreateAuditEntryState || (OauthApplicationCreateAuditEntryState = {}));
/** The corresponding operation type for the action */
export var OperationType;
(function (OperationType) {
    /** An existing resource was accessed */
    OperationType["Access"] = "ACCESS";
    /** A resource performed an authentication event */
    OperationType["Authentication"] = "AUTHENTICATION";
    /** A new resource was created */
    OperationType["Create"] = "CREATE";
    /** An existing resource was modified */
    OperationType["Modify"] = "MODIFY";
    /** An existing resource was removed */
    OperationType["Remove"] = "REMOVE";
    /** An existing resource was restored */
    OperationType["Restore"] = "RESTORE";
    /** An existing resource was transferred between multiple resources */
    OperationType["Transfer"] = "TRANSFER";
})(OperationType || (OperationType = {}));
/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export var OrderDirection;
(function (OrderDirection) {
    /** Specifies an ascending order for a given `orderBy` argument. */
    OrderDirection["Asc"] = "ASC";
    /** Specifies a descending order for a given `orderBy` argument. */
    OrderDirection["Desc"] = "DESC";
})(OrderDirection || (OrderDirection = {}));
/** The permissions available to members on an Organization. */
export var OrgAddMemberAuditEntryPermission;
(function (OrgAddMemberAuditEntryPermission) {
    /** Can read, clone, push, and add collaborators to repositories. */
    OrgAddMemberAuditEntryPermission["Admin"] = "ADMIN";
    /** Can read and clone repositories. */
    OrgAddMemberAuditEntryPermission["Read"] = "READ";
})(OrgAddMemberAuditEntryPermission || (OrgAddMemberAuditEntryPermission = {}));
/** The billing plans available for organizations. */
export var OrgCreateAuditEntryBillingPlan;
(function (OrgCreateAuditEntryBillingPlan) {
    /** Team Plan */
    OrgCreateAuditEntryBillingPlan["Business"] = "BUSINESS";
    /** Enterprise Cloud Plan */
    OrgCreateAuditEntryBillingPlan["BusinessPlus"] = "BUSINESS_PLUS";
    /** Free Plan */
    OrgCreateAuditEntryBillingPlan["Free"] = "FREE";
    /** Tiered Per Seat Plan */
    OrgCreateAuditEntryBillingPlan["TieredPerSeat"] = "TIERED_PER_SEAT";
    /** Legacy Unlimited Plan */
    OrgCreateAuditEntryBillingPlan["Unlimited"] = "UNLIMITED";
})(OrgCreateAuditEntryBillingPlan || (OrgCreateAuditEntryBillingPlan = {}));
/** Properties by which enterprise owners can be ordered. */
export var OrgEnterpriseOwnerOrderField;
(function (OrgEnterpriseOwnerOrderField) {
    /** Order enterprise owners by login. */
    OrgEnterpriseOwnerOrderField["Login"] = "LOGIN";
})(OrgEnterpriseOwnerOrderField || (OrgEnterpriseOwnerOrderField = {}));
/** The reason a billing manager was removed from an Organization. */
export var OrgRemoveBillingManagerAuditEntryReason;
(function (OrgRemoveBillingManagerAuditEntryReason) {
    /** SAML external identity missing */
    OrgRemoveBillingManagerAuditEntryReason["SamlExternalIdentityMissing"] = "SAML_EXTERNAL_IDENTITY_MISSING";
    /** SAML SSO enforcement requires an external identity */
    OrgRemoveBillingManagerAuditEntryReason["SamlSsoEnforcementRequiresExternalIdentity"] = "SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY";
    /** The organization required 2FA of its billing managers and this user did not have 2FA enabled. */
    OrgRemoveBillingManagerAuditEntryReason["TwoFactorRequirementNonCompliance"] = "TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE";
})(OrgRemoveBillingManagerAuditEntryReason || (OrgRemoveBillingManagerAuditEntryReason = {}));
/** The type of membership a user has with an Organization. */
export var OrgRemoveMemberAuditEntryMembershipType;
(function (OrgRemoveMemberAuditEntryMembershipType) {
    /**
     * Organization administrators have full access and can change several settings,
     * including the names of repositories that belong to the Organization and Owners
     * team membership. In addition, organization admins can delete the organization
     * and all of its repositories.
     */
    OrgRemoveMemberAuditEntryMembershipType["Admin"] = "ADMIN";
    /** A billing manager is a user who manages the billing settings for the Organization, such as updating payment information. */
    OrgRemoveMemberAuditEntryMembershipType["BillingManager"] = "BILLING_MANAGER";
    /** A direct member is a user that is a member of the Organization. */
    OrgRemoveMemberAuditEntryMembershipType["DirectMember"] = "DIRECT_MEMBER";
    /**
     * An outside collaborator is a person who isn't explicitly a member of the
     * Organization, but who has Read, Write, or Admin permissions to one or more
     * repositories in the organization.
     */
    OrgRemoveMemberAuditEntryMembershipType["OutsideCollaborator"] = "OUTSIDE_COLLABORATOR";
    /** A suspended member. */
    OrgRemoveMemberAuditEntryMembershipType["Suspended"] = "SUSPENDED";
    /**
     * An unaffiliated collaborator is a person who is not a member of the
     * Organization and does not have access to any repositories in the Organization.
     */
    OrgRemoveMemberAuditEntryMembershipType["Unaffiliated"] = "UNAFFILIATED";
})(OrgRemoveMemberAuditEntryMembershipType || (OrgRemoveMemberAuditEntryMembershipType = {}));
/** The reason a member was removed from an Organization. */
export var OrgRemoveMemberAuditEntryReason;
(function (OrgRemoveMemberAuditEntryReason) {
    /** SAML external identity missing */
    OrgRemoveMemberAuditEntryReason["SamlExternalIdentityMissing"] = "SAML_EXTERNAL_IDENTITY_MISSING";
    /** SAML SSO enforcement requires an external identity */
    OrgRemoveMemberAuditEntryReason["SamlSsoEnforcementRequiresExternalIdentity"] = "SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY";
    /** User was removed from organization during account recovery */
    OrgRemoveMemberAuditEntryReason["TwoFactorAccountRecovery"] = "TWO_FACTOR_ACCOUNT_RECOVERY";
    /** The organization required 2FA of its billing managers and this user did not have 2FA enabled. */
    OrgRemoveMemberAuditEntryReason["TwoFactorRequirementNonCompliance"] = "TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE";
    /** User account has been deleted */
    OrgRemoveMemberAuditEntryReason["UserAccountDeleted"] = "USER_ACCOUNT_DELETED";
})(OrgRemoveMemberAuditEntryReason || (OrgRemoveMemberAuditEntryReason = {}));
/** The type of membership a user has with an Organization. */
export var OrgRemoveOutsideCollaboratorAuditEntryMembershipType;
(function (OrgRemoveOutsideCollaboratorAuditEntryMembershipType) {
    /** A billing manager is a user who manages the billing settings for the Organization, such as updating payment information. */
    OrgRemoveOutsideCollaboratorAuditEntryMembershipType["BillingManager"] = "BILLING_MANAGER";
    /**
     * An outside collaborator is a person who isn't explicitly a member of the
     * Organization, but who has Read, Write, or Admin permissions to one or more
     * repositories in the organization.
     */
    OrgRemoveOutsideCollaboratorAuditEntryMembershipType["OutsideCollaborator"] = "OUTSIDE_COLLABORATOR";
    /**
     * An unaffiliated collaborator is a person who is not a member of the
     * Organization and does not have access to any repositories in the organization.
     */
    OrgRemoveOutsideCollaboratorAuditEntryMembershipType["Unaffiliated"] = "UNAFFILIATED";
})(OrgRemoveOutsideCollaboratorAuditEntryMembershipType || (OrgRemoveOutsideCollaboratorAuditEntryMembershipType = {}));
/** The reason an outside collaborator was removed from an Organization. */
export var OrgRemoveOutsideCollaboratorAuditEntryReason;
(function (OrgRemoveOutsideCollaboratorAuditEntryReason) {
    /** SAML external identity missing */
    OrgRemoveOutsideCollaboratorAuditEntryReason["SamlExternalIdentityMissing"] = "SAML_EXTERNAL_IDENTITY_MISSING";
    /** The organization required 2FA of its billing managers and this user did not have 2FA enabled. */
    OrgRemoveOutsideCollaboratorAuditEntryReason["TwoFactorRequirementNonCompliance"] = "TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE";
})(OrgRemoveOutsideCollaboratorAuditEntryReason || (OrgRemoveOutsideCollaboratorAuditEntryReason = {}));
/** The default permission a repository can have in an Organization. */
export var OrgUpdateDefaultRepositoryPermissionAuditEntryPermission;
(function (OrgUpdateDefaultRepositoryPermissionAuditEntryPermission) {
    /** Can read, clone, push, and add collaborators to repositories. */
    OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["Admin"] = "ADMIN";
    /** No default permission value. */
    OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["None"] = "NONE";
    /** Can read and clone repositories. */
    OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["Read"] = "READ";
    /** Can read, clone and push to repositories. */
    OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["Write"] = "WRITE";
})(OrgUpdateDefaultRepositoryPermissionAuditEntryPermission || (OrgUpdateDefaultRepositoryPermissionAuditEntryPermission = {}));
/** The permissions available to members on an Organization. */
export var OrgUpdateMemberAuditEntryPermission;
(function (OrgUpdateMemberAuditEntryPermission) {
    /** Can read, clone, push, and add collaborators to repositories. */
    OrgUpdateMemberAuditEntryPermission["Admin"] = "ADMIN";
    /** Can read and clone repositories. */
    OrgUpdateMemberAuditEntryPermission["Read"] = "READ";
})(OrgUpdateMemberAuditEntryPermission || (OrgUpdateMemberAuditEntryPermission = {}));
/** The permissions available for repository creation on an Organization. */
export var OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility;
(function (OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility) {
    /** All organization members are restricted from creating any repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["All"] = "ALL";
    /** All organization members are restricted from creating internal repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["Internal"] = "INTERNAL";
    /** All organization members are allowed to create any repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["None"] = "NONE";
    /** All organization members are restricted from creating private repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["Private"] = "PRIVATE";
    /** All organization members are restricted from creating private or internal repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["PrivateInternal"] = "PRIVATE_INTERNAL";
    /** All organization members are restricted from creating public repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["Public"] = "PUBLIC";
    /** All organization members are restricted from creating public or internal repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["PublicInternal"] = "PUBLIC_INTERNAL";
    /** All organization members are restricted from creating public or private repositories. */
    OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["PublicPrivate"] = "PUBLIC_PRIVATE";
})(OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility || (OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility = {}));
/** The possible organization invitation roles. */
export var OrganizationInvitationRole;
(function (OrganizationInvitationRole) {
    /** The user is invited to be an admin of the organization. */
    OrganizationInvitationRole["Admin"] = "ADMIN";
    /** The user is invited to be a billing manager of the organization. */
    OrganizationInvitationRole["BillingManager"] = "BILLING_MANAGER";
    /** The user is invited to be a direct member of the organization. */
    OrganizationInvitationRole["DirectMember"] = "DIRECT_MEMBER";
    /** The user's previous role will be reinstated. */
    OrganizationInvitationRole["Reinstate"] = "REINSTATE";
})(OrganizationInvitationRole || (OrganizationInvitationRole = {}));
/** The possible organization invitation types. */
export var OrganizationInvitationType;
(function (OrganizationInvitationType) {
    /** The invitation was to an email address. */
    OrganizationInvitationType["Email"] = "EMAIL";
    /** The invitation was to an existing user. */
    OrganizationInvitationType["User"] = "USER";
})(OrganizationInvitationType || (OrganizationInvitationType = {}));
/** The possible roles within an organization for its members. */
export var OrganizationMemberRole;
(function (OrganizationMemberRole) {
    /** The user is an administrator of the organization. */
    OrganizationMemberRole["Admin"] = "ADMIN";
    /** The user is a member of the organization. */
    OrganizationMemberRole["Member"] = "MEMBER";
})(OrganizationMemberRole || (OrganizationMemberRole = {}));
/** The possible values for the members can create repositories setting on an organization. */
export var OrganizationMembersCanCreateRepositoriesSettingValue;
(function (OrganizationMembersCanCreateRepositoriesSettingValue) {
    /** Members will be able to create public and private repositories. */
    OrganizationMembersCanCreateRepositoriesSettingValue["All"] = "ALL";
    /** Members will not be able to create public or private repositories. */
    OrganizationMembersCanCreateRepositoriesSettingValue["Disabled"] = "DISABLED";
    /** Members will be able to create only internal repositories. */
    OrganizationMembersCanCreateRepositoriesSettingValue["Internal"] = "INTERNAL";
    /** Members will be able to create only private repositories. */
    OrganizationMembersCanCreateRepositoriesSettingValue["Private"] = "PRIVATE";
})(OrganizationMembersCanCreateRepositoriesSettingValue || (OrganizationMembersCanCreateRepositoriesSettingValue = {}));
/** Properties by which organization connections can be ordered. */
export var OrganizationOrderField;
(function (OrganizationOrderField) {
    /** Order organizations by creation time */
    OrganizationOrderField["CreatedAt"] = "CREATED_AT";
    /** Order organizations by login */
    OrganizationOrderField["Login"] = "LOGIN";
})(OrganizationOrderField || (OrganizationOrderField = {}));
/** Properties by which package file connections can be ordered. */
export var PackageFileOrderField;
(function (PackageFileOrderField) {
    /** Order package files by creation time */
    PackageFileOrderField["CreatedAt"] = "CREATED_AT";
})(PackageFileOrderField || (PackageFileOrderField = {}));
/** Properties by which package connections can be ordered. */
export var PackageOrderField;
(function (PackageOrderField) {
    /** Order packages by creation time */
    PackageOrderField["CreatedAt"] = "CREATED_AT";
})(PackageOrderField || (PackageOrderField = {}));
/** The possible types of a package. */
export var PackageType;
(function (PackageType) {
    /** A debian package. */
    PackageType["Debian"] = "DEBIAN";
    /**
     * A docker image.
     * @deprecated DOCKER will be removed from this enum as this type will be migrated to only be used by the Packages REST API. Removal on 2021-06-21 UTC.
     */
    PackageType["Docker"] = "DOCKER";
    /** A maven package. */
    PackageType["Maven"] = "MAVEN";
    /** An npm package. */
    PackageType["Npm"] = "NPM";
    /** A nuget package. */
    PackageType["Nuget"] = "NUGET";
    /** A python package. */
    PackageType["Pypi"] = "PYPI";
    /** A rubygems package. */
    PackageType["Rubygems"] = "RUBYGEMS";
})(PackageType || (PackageType = {}));
/** Properties by which package version connections can be ordered. */
export var PackageVersionOrderField;
(function (PackageVersionOrderField) {
    /** Order package versions by creation time */
    PackageVersionOrderField["CreatedAt"] = "CREATED_AT";
})(PackageVersionOrderField || (PackageVersionOrderField = {}));
/** The possible types of patch statuses. */
export var PatchStatus;
(function (PatchStatus) {
    /** The file was added. Git status 'A'. */
    PatchStatus["Added"] = "ADDED";
    /** The file's type was changed. Git status 'T'. */
    PatchStatus["Changed"] = "CHANGED";
    /** The file was copied. Git status 'C'. */
    PatchStatus["Copied"] = "COPIED";
    /** The file was deleted. Git status 'D'. */
    PatchStatus["Deleted"] = "DELETED";
    /** The file's contents were changed. Git status 'M'. */
    PatchStatus["Modified"] = "MODIFIED";
    /** The file was renamed. Git status 'R'. */
    PatchStatus["Renamed"] = "RENAMED";
})(PatchStatus || (PatchStatus = {}));
/** Represents items that can be pinned to a profile page or dashboard. */
export var PinnableItemType;
(function (PinnableItemType) {
    /** A gist. */
    PinnableItemType["Gist"] = "GIST";
    /** An issue. */
    PinnableItemType["Issue"] = "ISSUE";
    /** An organization. */
    PinnableItemType["Organization"] = "ORGANIZATION";
    /** A project. */
    PinnableItemType["Project"] = "PROJECT";
    /** A pull request. */
    PinnableItemType["PullRequest"] = "PULL_REQUEST";
    /** A repository. */
    PinnableItemType["Repository"] = "REPOSITORY";
    /** A team. */
    PinnableItemType["Team"] = "TEAM";
    /** A user. */
    PinnableItemType["User"] = "USER";
})(PinnableItemType || (PinnableItemType = {}));
/** Preconfigured gradients that may be used to style discussions pinned within a repository. */
export var PinnedDiscussionGradient;
(function (PinnedDiscussionGradient) {
    /** A gradient of blue to mint */
    PinnedDiscussionGradient["BlueMint"] = "BLUE_MINT";
    /** A gradient of blue to purple */
    PinnedDiscussionGradient["BluePurple"] = "BLUE_PURPLE";
    /** A gradient of pink to blue */
    PinnedDiscussionGradient["PinkBlue"] = "PINK_BLUE";
    /** A gradient of purple to coral */
    PinnedDiscussionGradient["PurpleCoral"] = "PURPLE_CORAL";
    /** A gradient of red to orange */
    PinnedDiscussionGradient["RedOrange"] = "RED_ORANGE";
})(PinnedDiscussionGradient || (PinnedDiscussionGradient = {}));
/** Preconfigured background patterns that may be used to style discussions pinned within a repository. */
export var PinnedDiscussionPattern;
(function (PinnedDiscussionPattern) {
    /** An upward-facing chevron pattern */
    PinnedDiscussionPattern["ChevronUp"] = "CHEVRON_UP";
    /** A hollow dot pattern */
    PinnedDiscussionPattern["Dot"] = "DOT";
    /** A solid dot pattern */
    PinnedDiscussionPattern["DotFill"] = "DOT_FILL";
    /** A heart pattern */
    PinnedDiscussionPattern["HeartFill"] = "HEART_FILL";
    /** A plus sign pattern */
    PinnedDiscussionPattern["Plus"] = "PLUS";
    /** A lightning bolt pattern */
    PinnedDiscussionPattern["Zap"] = "ZAP";
})(PinnedDiscussionPattern || (PinnedDiscussionPattern = {}));
/** The possible archived states of a project card. */
export var ProjectCardArchivedState;
(function (ProjectCardArchivedState) {
    /** A project card that is archived */
    ProjectCardArchivedState["Archived"] = "ARCHIVED";
    /** A project card that is not archived */
    ProjectCardArchivedState["NotArchived"] = "NOT_ARCHIVED";
})(ProjectCardArchivedState || (ProjectCardArchivedState = {}));
/** Various content states of a ProjectCard */
export var ProjectCardState;
(function (ProjectCardState) {
    /** The card has content only. */
    ProjectCardState["ContentOnly"] = "CONTENT_ONLY";
    /** The card has a note only. */
    ProjectCardState["NoteOnly"] = "NOTE_ONLY";
    /** The card is redacted. */
    ProjectCardState["Redacted"] = "REDACTED";
})(ProjectCardState || (ProjectCardState = {}));
/** The semantic purpose of the column - todo, in progress, or done. */
export var ProjectColumnPurpose;
(function (ProjectColumnPurpose) {
    /** The column contains cards which are complete */
    ProjectColumnPurpose["Done"] = "DONE";
    /** The column contains cards which are currently being worked on */
    ProjectColumnPurpose["InProgress"] = "IN_PROGRESS";
    /** The column contains cards still to be worked on */
    ProjectColumnPurpose["Todo"] = "TODO";
})(ProjectColumnPurpose || (ProjectColumnPurpose = {}));
/** The type of a project item. */
export var ProjectItemType;
(function (ProjectItemType) {
    /** Draft Issue */
    ProjectItemType["DraftIssue"] = "DRAFT_ISSUE";
    /** Issue */
    ProjectItemType["Issue"] = "ISSUE";
    /** Pull Request */
    ProjectItemType["PullRequest"] = "PULL_REQUEST";
    /** Redacted Item */
    ProjectItemType["Redacted"] = "REDACTED";
})(ProjectItemType || (ProjectItemType = {}));
/** The type of a project next field. */
export var ProjectNextFieldType;
(function (ProjectNextFieldType) {
    /**
     * Assignees
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Assignees"] = "ASSIGNEES";
    /**
     * Date
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Date"] = "DATE";
    /**
     * Iteration
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Iteration"] = "ITERATION";
    /**
     * Labels
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Labels"] = "LABELS";
    /**
     * Linked Pull Requests
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["LinkedPullRequests"] = "LINKED_PULL_REQUESTS";
    /**
     * Milestone
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Milestone"] = "MILESTONE";
    /**
     * Number
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Number"] = "NUMBER";
    /**
     * Repository
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Repository"] = "REPOSITORY";
    /**
     * Reviewers
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Reviewers"] = "REVIEWERS";
    /**
     * Single Select
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["SingleSelect"] = "SINGLE_SELECT";
    /**
     * Text
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Text"] = "TEXT";
    /**
     * Title
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Title"] = "TITLE";
    /**
     * Tracks
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextFieldType["Tracks"] = "TRACKS";
})(ProjectNextFieldType || (ProjectNextFieldType = {}));
/** Properties by which the return project can be ordered. */
export var ProjectNextOrderField;
(function (ProjectNextOrderField) {
    /**
     * The project's date and time of creation
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextOrderField["CreatedAt"] = "CREATED_AT";
    /**
     * The project's number
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextOrderField["Number"] = "NUMBER";
    /**
     * The project's title
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextOrderField["Title"] = "TITLE";
    /**
     * The project's date and time of update
     * @deprecated The `ProjectNext` API is deprecated in favour of the more capable `ProjectV2` API. Follow the ProjectV2 guide at https://github.blog/changelog/2022-06-23-the-new-github-issues-june-23rd-update/, to find a suitable replacement. Removal on 2022-10-01 UTC.
     */
    ProjectNextOrderField["UpdatedAt"] = "UPDATED_AT";
})(ProjectNextOrderField || (ProjectNextOrderField = {}));
/** Properties by which project connections can be ordered. */
export var ProjectOrderField;
(function (ProjectOrderField) {
    /** Order projects by creation time */
    ProjectOrderField["CreatedAt"] = "CREATED_AT";
    /** Order projects by name */
    ProjectOrderField["Name"] = "NAME";
    /** Order projects by update time */
    ProjectOrderField["UpdatedAt"] = "UPDATED_AT";
})(ProjectOrderField || (ProjectOrderField = {}));
/** State of the project; either 'open' or 'closed' */
export var ProjectState;
(function (ProjectState) {
    /** The project is closed. */
    ProjectState["Closed"] = "CLOSED";
    /** The project is open. */
    ProjectState["Open"] = "OPEN";
})(ProjectState || (ProjectState = {}));
/** GitHub-provided templates for Projects */
export var ProjectTemplate;
(function (ProjectTemplate) {
    /** Create a board with v2 triggers to automatically move cards across To do, In progress and Done columns. */
    ProjectTemplate["AutomatedKanbanV2"] = "AUTOMATED_KANBAN_V2";
    /** Create a board with triggers to automatically move cards across columns with review automation. */
    ProjectTemplate["AutomatedReviewsKanban"] = "AUTOMATED_REVIEWS_KANBAN";
    /** Create a board with columns for To do, In progress and Done. */
    ProjectTemplate["BasicKanban"] = "BASIC_KANBAN";
    /** Create a board to triage and prioritize bugs with To do, priority, and Done columns. */
    ProjectTemplate["BugTriage"] = "BUG_TRIAGE";
})(ProjectTemplate || (ProjectTemplate = {}));
/** Properties by which project v2 field connections can be ordered. */
export var ProjectV2FieldOrderField;
(function (ProjectV2FieldOrderField) {
    /** Order project v2 fields by creation time */
    ProjectV2FieldOrderField["CreatedAt"] = "CREATED_AT";
    /** Order project v2 fields by name */
    ProjectV2FieldOrderField["Name"] = "NAME";
    /** Order project v2 fields by position */
    ProjectV2FieldOrderField["Position"] = "POSITION";
})(ProjectV2FieldOrderField || (ProjectV2FieldOrderField = {}));
/** The type of a project field. */
export var ProjectV2FieldType;
(function (ProjectV2FieldType) {
    /** Assignees */
    ProjectV2FieldType["Assignees"] = "ASSIGNEES";
    /** Date */
    ProjectV2FieldType["Date"] = "DATE";
    /** Iteration */
    ProjectV2FieldType["Iteration"] = "ITERATION";
    /** Labels */
    ProjectV2FieldType["Labels"] = "LABELS";
    /** Linked Pull Requests */
    ProjectV2FieldType["LinkedPullRequests"] = "LINKED_PULL_REQUESTS";
    /** Milestone */
    ProjectV2FieldType["Milestone"] = "MILESTONE";
    /** Number */
    ProjectV2FieldType["Number"] = "NUMBER";
    /** Repository */
    ProjectV2FieldType["Repository"] = "REPOSITORY";
    /** Reviewers */
    ProjectV2FieldType["Reviewers"] = "REVIEWERS";
    /** Single Select */
    ProjectV2FieldType["SingleSelect"] = "SINGLE_SELECT";
    /** Text */
    ProjectV2FieldType["Text"] = "TEXT";
    /** Title */
    ProjectV2FieldType["Title"] = "TITLE";
    /** Tracks */
    ProjectV2FieldType["Tracks"] = "TRACKS";
})(ProjectV2FieldType || (ProjectV2FieldType = {}));
/** Properties by which project v2 item field value connections can be ordered. */
export var ProjectV2ItemFieldValueOrderField;
(function (ProjectV2ItemFieldValueOrderField) {
    /** Order project v2 item field values by the their position in the project */
    ProjectV2ItemFieldValueOrderField["Position"] = "POSITION";
})(ProjectV2ItemFieldValueOrderField || (ProjectV2ItemFieldValueOrderField = {}));
/** Properties by which project v2 item connections can be ordered. */
export var ProjectV2ItemOrderField;
(function (ProjectV2ItemOrderField) {
    /** Order project v2 items by the their position in the project */
    ProjectV2ItemOrderField["Position"] = "POSITION";
})(ProjectV2ItemOrderField || (ProjectV2ItemOrderField = {}));
/** The type of a project item. */
export var ProjectV2ItemType;
(function (ProjectV2ItemType) {
    /** Draft Issue */
    ProjectV2ItemType["DraftIssue"] = "DRAFT_ISSUE";
    /** Issue */
    ProjectV2ItemType["Issue"] = "ISSUE";
    /** Pull Request */
    ProjectV2ItemType["PullRequest"] = "PULL_REQUEST";
    /** Redacted Item */
    ProjectV2ItemType["Redacted"] = "REDACTED";
})(ProjectV2ItemType || (ProjectV2ItemType = {}));
/** Properties by which projects can be ordered. */
export var ProjectV2OrderField;
(function (ProjectV2OrderField) {
    /** The project's date and time of creation */
    ProjectV2OrderField["CreatedAt"] = "CREATED_AT";
    /** The project's number */
    ProjectV2OrderField["Number"] = "NUMBER";
    /** The project's title */
    ProjectV2OrderField["Title"] = "TITLE";
    /** The project's date and time of update */
    ProjectV2OrderField["UpdatedAt"] = "UPDATED_AT";
})(ProjectV2OrderField || (ProjectV2OrderField = {}));
/** The layout of a project v2 view. */
export var ProjectV2ViewLayout;
(function (ProjectV2ViewLayout) {
    /** Board layout */
    ProjectV2ViewLayout["BoardLayout"] = "BOARD_LAYOUT";
    /** Table layout */
    ProjectV2ViewLayout["TableLayout"] = "TABLE_LAYOUT";
})(ProjectV2ViewLayout || (ProjectV2ViewLayout = {}));
/** Properties by which project v2 view connections can be ordered. */
export var ProjectV2ViewOrderField;
(function (ProjectV2ViewOrderField) {
    /** Order project v2 views by creation time */
    ProjectV2ViewOrderField["CreatedAt"] = "CREATED_AT";
    /** Order project v2 views by name */
    ProjectV2ViewOrderField["Name"] = "NAME";
    /** Order project v2 views by position */
    ProjectV2ViewOrderField["Position"] = "POSITION";
})(ProjectV2ViewOrderField || (ProjectV2ViewOrderField = {}));
/** The layout of a project view. */
export var ProjectViewLayout;
(function (ProjectViewLayout) {
    /** Board layout */
    ProjectViewLayout["BoardLayout"] = "BOARD_LAYOUT";
    /** Table layout */
    ProjectViewLayout["TableLayout"] = "TABLE_LAYOUT";
})(ProjectViewLayout || (ProjectViewLayout = {}));
/** Represents available types of methods to use when merging a pull request. */
export var PullRequestMergeMethod;
(function (PullRequestMergeMethod) {
    /** Add all commits from the head branch to the base branch with a merge commit. */
    PullRequestMergeMethod["Merge"] = "MERGE";
    /** Add all commits from the head branch onto the base branch individually. */
    PullRequestMergeMethod["Rebase"] = "REBASE";
    /** Combine all commits from the head branch into a single commit in the base branch. */
    PullRequestMergeMethod["Squash"] = "SQUASH";
})(PullRequestMergeMethod || (PullRequestMergeMethod = {}));
/** Properties by which pull_requests connections can be ordered. */
export var PullRequestOrderField;
(function (PullRequestOrderField) {
    /** Order pull_requests by creation time */
    PullRequestOrderField["CreatedAt"] = "CREATED_AT";
    /** Order pull_requests by update time */
    PullRequestOrderField["UpdatedAt"] = "UPDATED_AT";
})(PullRequestOrderField || (PullRequestOrderField = {}));
/** The possible states of a pull request review comment. */
export var PullRequestReviewCommentState;
(function (PullRequestReviewCommentState) {
    /** A comment that is part of a pending review */
    PullRequestReviewCommentState["Pending"] = "PENDING";
    /** A comment that is part of a submitted review */
    PullRequestReviewCommentState["Submitted"] = "SUBMITTED";
})(PullRequestReviewCommentState || (PullRequestReviewCommentState = {}));
/** The review status of a pull request. */
export var PullRequestReviewDecision;
(function (PullRequestReviewDecision) {
    /** The pull request has received an approving review. */
    PullRequestReviewDecision["Approved"] = "APPROVED";
    /** Changes have been requested on the pull request. */
    PullRequestReviewDecision["ChangesRequested"] = "CHANGES_REQUESTED";
    /** A review is required before the pull request can be merged. */
    PullRequestReviewDecision["ReviewRequired"] = "REVIEW_REQUIRED";
})(PullRequestReviewDecision || (PullRequestReviewDecision = {}));
/** The possible events to perform on a pull request review. */
export var PullRequestReviewEvent;
(function (PullRequestReviewEvent) {
    /** Submit feedback and approve merging these changes. */
    PullRequestReviewEvent["Approve"] = "APPROVE";
    /** Submit general feedback without explicit approval. */
    PullRequestReviewEvent["Comment"] = "COMMENT";
    /** Dismiss review so it now longer effects merging. */
    PullRequestReviewEvent["Dismiss"] = "DISMISS";
    /** Submit feedback that must be addressed before merging. */
    PullRequestReviewEvent["RequestChanges"] = "REQUEST_CHANGES";
})(PullRequestReviewEvent || (PullRequestReviewEvent = {}));
/** The possible states of a pull request review. */
export var PullRequestReviewState;
(function (PullRequestReviewState) {
    /** A review allowing the pull request to merge. */
    PullRequestReviewState["Approved"] = "APPROVED";
    /** A review blocking the pull request from merging. */
    PullRequestReviewState["ChangesRequested"] = "CHANGES_REQUESTED";
    /** An informational review. */
    PullRequestReviewState["Commented"] = "COMMENTED";
    /** A review that has been dismissed. */
    PullRequestReviewState["Dismissed"] = "DISMISSED";
    /** A review that has not yet been submitted. */
    PullRequestReviewState["Pending"] = "PENDING";
})(PullRequestReviewState || (PullRequestReviewState = {}));
/** The possible states of a pull request. */
export var PullRequestState;
(function (PullRequestState) {
    /** A pull request that has been closed without being merged. */
    PullRequestState["Closed"] = "CLOSED";
    /** A pull request that has been closed by being merged. */
    PullRequestState["Merged"] = "MERGED";
    /** A pull request that is still open. */
    PullRequestState["Open"] = "OPEN";
})(PullRequestState || (PullRequestState = {}));
/** The possible item types found in a timeline. */
export var PullRequestTimelineItemsItemType;
(function (PullRequestTimelineItemsItemType) {
    /** Represents an 'added_to_merge_queue' event on a given pull request. */
    PullRequestTimelineItemsItemType["AddedToMergeQueueEvent"] = "ADDED_TO_MERGE_QUEUE_EVENT";
    /** Represents a 'added_to_project' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["AddedToProjectEvent"] = "ADDED_TO_PROJECT_EVENT";
    /** Represents an 'assigned' event on any assignable object. */
    PullRequestTimelineItemsItemType["AssignedEvent"] = "ASSIGNED_EVENT";
    /** Represents a 'automatic_base_change_failed' event on a given pull request. */
    PullRequestTimelineItemsItemType["AutomaticBaseChangeFailedEvent"] = "AUTOMATIC_BASE_CHANGE_FAILED_EVENT";
    /** Represents a 'automatic_base_change_succeeded' event on a given pull request. */
    PullRequestTimelineItemsItemType["AutomaticBaseChangeSucceededEvent"] = "AUTOMATIC_BASE_CHANGE_SUCCEEDED_EVENT";
    /** Represents a 'auto_merge_disabled' event on a given pull request. */
    PullRequestTimelineItemsItemType["AutoMergeDisabledEvent"] = "AUTO_MERGE_DISABLED_EVENT";
    /** Represents a 'auto_merge_enabled' event on a given pull request. */
    PullRequestTimelineItemsItemType["AutoMergeEnabledEvent"] = "AUTO_MERGE_ENABLED_EVENT";
    /** Represents a 'auto_rebase_enabled' event on a given pull request. */
    PullRequestTimelineItemsItemType["AutoRebaseEnabledEvent"] = "AUTO_REBASE_ENABLED_EVENT";
    /** Represents a 'auto_squash_enabled' event on a given pull request. */
    PullRequestTimelineItemsItemType["AutoSquashEnabledEvent"] = "AUTO_SQUASH_ENABLED_EVENT";
    /** Represents a 'base_ref_changed' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["BaseRefChangedEvent"] = "BASE_REF_CHANGED_EVENT";
    /** Represents a 'base_ref_deleted' event on a given pull request. */
    PullRequestTimelineItemsItemType["BaseRefDeletedEvent"] = "BASE_REF_DELETED_EVENT";
    /** Represents a 'base_ref_force_pushed' event on a given pull request. */
    PullRequestTimelineItemsItemType["BaseRefForcePushedEvent"] = "BASE_REF_FORCE_PUSHED_EVENT";
    /** Represents a 'closed' event on any `Closable`. */
    PullRequestTimelineItemsItemType["ClosedEvent"] = "CLOSED_EVENT";
    /** Represents a 'comment_deleted' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["CommentDeletedEvent"] = "COMMENT_DELETED_EVENT";
    /** Represents a 'connected' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["ConnectedEvent"] = "CONNECTED_EVENT";
    /** Represents a 'converted_note_to_issue' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["ConvertedNoteToIssueEvent"] = "CONVERTED_NOTE_TO_ISSUE_EVENT";
    /** Represents a 'converted_to_discussion' event on a given issue. */
    PullRequestTimelineItemsItemType["ConvertedToDiscussionEvent"] = "CONVERTED_TO_DISCUSSION_EVENT";
    /** Represents a 'convert_to_draft' event on a given pull request. */
    PullRequestTimelineItemsItemType["ConvertToDraftEvent"] = "CONVERT_TO_DRAFT_EVENT";
    /** Represents a mention made by one issue or pull request to another. */
    PullRequestTimelineItemsItemType["CrossReferencedEvent"] = "CROSS_REFERENCED_EVENT";
    /** Represents a 'demilestoned' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["DemilestonedEvent"] = "DEMILESTONED_EVENT";
    /** Represents a 'deployed' event on a given pull request. */
    PullRequestTimelineItemsItemType["DeployedEvent"] = "DEPLOYED_EVENT";
    /** Represents a 'deployment_environment_changed' event on a given pull request. */
    PullRequestTimelineItemsItemType["DeploymentEnvironmentChangedEvent"] = "DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT";
    /** Represents a 'disconnected' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["DisconnectedEvent"] = "DISCONNECTED_EVENT";
    /** Represents a 'head_ref_deleted' event on a given pull request. */
    PullRequestTimelineItemsItemType["HeadRefDeletedEvent"] = "HEAD_REF_DELETED_EVENT";
    /** Represents a 'head_ref_force_pushed' event on a given pull request. */
    PullRequestTimelineItemsItemType["HeadRefForcePushedEvent"] = "HEAD_REF_FORCE_PUSHED_EVENT";
    /** Represents a 'head_ref_restored' event on a given pull request. */
    PullRequestTimelineItemsItemType["HeadRefRestoredEvent"] = "HEAD_REF_RESTORED_EVENT";
    /** Represents a comment on an Issue. */
    PullRequestTimelineItemsItemType["IssueComment"] = "ISSUE_COMMENT";
    /** Represents a 'labeled' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["LabeledEvent"] = "LABELED_EVENT";
    /** Represents a 'locked' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["LockedEvent"] = "LOCKED_EVENT";
    /** Represents a 'marked_as_duplicate' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["MarkedAsDuplicateEvent"] = "MARKED_AS_DUPLICATE_EVENT";
    /** Represents a 'mentioned' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["MentionedEvent"] = "MENTIONED_EVENT";
    /** Represents a 'merged' event on a given pull request. */
    PullRequestTimelineItemsItemType["MergedEvent"] = "MERGED_EVENT";
    /** Represents a 'milestoned' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["MilestonedEvent"] = "MILESTONED_EVENT";
    /** Represents a 'moved_columns_in_project' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["MovedColumnsInProjectEvent"] = "MOVED_COLUMNS_IN_PROJECT_EVENT";
    /** Represents a 'pinned' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["PinnedEvent"] = "PINNED_EVENT";
    /** Represents a Git commit part of a pull request. */
    PullRequestTimelineItemsItemType["PullRequestCommit"] = "PULL_REQUEST_COMMIT";
    /** Represents a commit comment thread part of a pull request. */
    PullRequestTimelineItemsItemType["PullRequestCommitCommentThread"] = "PULL_REQUEST_COMMIT_COMMENT_THREAD";
    /** A review object for a given pull request. */
    PullRequestTimelineItemsItemType["PullRequestReview"] = "PULL_REQUEST_REVIEW";
    /** A threaded list of comments for a given pull request. */
    PullRequestTimelineItemsItemType["PullRequestReviewThread"] = "PULL_REQUEST_REVIEW_THREAD";
    /** Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits. */
    PullRequestTimelineItemsItemType["PullRequestRevisionMarker"] = "PULL_REQUEST_REVISION_MARKER";
    /** Represents a 'ready_for_review' event on a given pull request. */
    PullRequestTimelineItemsItemType["ReadyForReviewEvent"] = "READY_FOR_REVIEW_EVENT";
    /** Represents a 'referenced' event on a given `ReferencedSubject`. */
    PullRequestTimelineItemsItemType["ReferencedEvent"] = "REFERENCED_EVENT";
    /** Represents a 'removed_from_merge_queue' event on a given pull request. */
    PullRequestTimelineItemsItemType["RemovedFromMergeQueueEvent"] = "REMOVED_FROM_MERGE_QUEUE_EVENT";
    /** Represents a 'removed_from_project' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["RemovedFromProjectEvent"] = "REMOVED_FROM_PROJECT_EVENT";
    /** Represents a 'renamed' event on a given issue or pull request */
    PullRequestTimelineItemsItemType["RenamedTitleEvent"] = "RENAMED_TITLE_EVENT";
    /** Represents a 'reopened' event on any `Closable`. */
    PullRequestTimelineItemsItemType["ReopenedEvent"] = "REOPENED_EVENT";
    /** Represents a 'review_dismissed' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["ReviewDismissedEvent"] = "REVIEW_DISMISSED_EVENT";
    /** Represents an 'review_requested' event on a given pull request. */
    PullRequestTimelineItemsItemType["ReviewRequestedEvent"] = "REVIEW_REQUESTED_EVENT";
    /** Represents an 'review_request_removed' event on a given pull request. */
    PullRequestTimelineItemsItemType["ReviewRequestRemovedEvent"] = "REVIEW_REQUEST_REMOVED_EVENT";
    /** Represents a 'subscribed' event on a given `Subscribable`. */
    PullRequestTimelineItemsItemType["SubscribedEvent"] = "SUBSCRIBED_EVENT";
    /** Represents a 'transferred' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["TransferredEvent"] = "TRANSFERRED_EVENT";
    /** Represents an 'unassigned' event on any assignable object. */
    PullRequestTimelineItemsItemType["UnassignedEvent"] = "UNASSIGNED_EVENT";
    /** Represents an 'unlabeled' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["UnlabeledEvent"] = "UNLABELED_EVENT";
    /** Represents an 'unlocked' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["UnlockedEvent"] = "UNLOCKED_EVENT";
    /** Represents an 'unmarked_as_duplicate' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["UnmarkedAsDuplicateEvent"] = "UNMARKED_AS_DUPLICATE_EVENT";
    /** Represents an 'unpinned' event on a given issue or pull request. */
    PullRequestTimelineItemsItemType["UnpinnedEvent"] = "UNPINNED_EVENT";
    /** Represents an 'unsubscribed' event on a given `Subscribable`. */
    PullRequestTimelineItemsItemType["UnsubscribedEvent"] = "UNSUBSCRIBED_EVENT";
    /** Represents a 'user_blocked' event on a given user. */
    PullRequestTimelineItemsItemType["UserBlockedEvent"] = "USER_BLOCKED_EVENT";
})(PullRequestTimelineItemsItemType || (PullRequestTimelineItemsItemType = {}));
/** The possible target states when updating a pull request. */
export var PullRequestUpdateState;
(function (PullRequestUpdateState) {
    /** A pull request that has been closed without being merged. */
    PullRequestUpdateState["Closed"] = "CLOSED";
    /** A pull request that is still open. */
    PullRequestUpdateState["Open"] = "OPEN";
})(PullRequestUpdateState || (PullRequestUpdateState = {}));
/** Emojis that can be attached to Issues, Pull Requests and Comments. */
export var ReactionContent;
(function (ReactionContent) {
    /** Represents the `:confused:` emoji. */
    ReactionContent["Confused"] = "CONFUSED";
    /** Represents the `:eyes:` emoji. */
    ReactionContent["Eyes"] = "EYES";
    /** Represents the `:heart:` emoji. */
    ReactionContent["Heart"] = "HEART";
    /** Represents the `:hooray:` emoji. */
    ReactionContent["Hooray"] = "HOORAY";
    /** Represents the `:laugh:` emoji. */
    ReactionContent["Laugh"] = "LAUGH";
    /** Represents the `:rocket:` emoji. */
    ReactionContent["Rocket"] = "ROCKET";
    /** Represents the `:-1:` emoji. */
    ReactionContent["ThumbsDown"] = "THUMBS_DOWN";
    /** Represents the `:+1:` emoji. */
    ReactionContent["ThumbsUp"] = "THUMBS_UP";
})(ReactionContent || (ReactionContent = {}));
/** A list of fields that reactions can be ordered by. */
export var ReactionOrderField;
(function (ReactionOrderField) {
    /** Allows ordering a list of reactions by when they were created. */
    ReactionOrderField["CreatedAt"] = "CREATED_AT";
})(ReactionOrderField || (ReactionOrderField = {}));
/** Properties by which ref connections can be ordered. */
export var RefOrderField;
(function (RefOrderField) {
    /** Order refs by their alphanumeric name */
    RefOrderField["Alphabetical"] = "ALPHABETICAL";
    /** Order refs by underlying commit date if the ref prefix is refs/tags/ */
    RefOrderField["TagCommitDate"] = "TAG_COMMIT_DATE";
})(RefOrderField || (RefOrderField = {}));
/** Properties by which release connections can be ordered. */
export var ReleaseOrderField;
(function (ReleaseOrderField) {
    /** Order releases by creation time */
    ReleaseOrderField["CreatedAt"] = "CREATED_AT";
    /** Order releases alphabetically by name */
    ReleaseOrderField["Name"] = "NAME";
})(ReleaseOrderField || (ReleaseOrderField = {}));
/** The privacy of a repository */
export var RepoAccessAuditEntryVisibility;
(function (RepoAccessAuditEntryVisibility) {
    /** The repository is visible only to users in the same business. */
    RepoAccessAuditEntryVisibility["Internal"] = "INTERNAL";
    /** The repository is visible only to those with explicit access. */
    RepoAccessAuditEntryVisibility["Private"] = "PRIVATE";
    /** The repository is visible to everyone. */
    RepoAccessAuditEntryVisibility["Public"] = "PUBLIC";
})(RepoAccessAuditEntryVisibility || (RepoAccessAuditEntryVisibility = {}));
/** The privacy of a repository */
export var RepoAddMemberAuditEntryVisibility;
(function (RepoAddMemberAuditEntryVisibility) {
    /** The repository is visible only to users in the same business. */
    RepoAddMemberAuditEntryVisibility["Internal"] = "INTERNAL";
    /** The repository is visible only to those with explicit access. */
    RepoAddMemberAuditEntryVisibility["Private"] = "PRIVATE";
    /** The repository is visible to everyone. */
    RepoAddMemberAuditEntryVisibility["Public"] = "PUBLIC";
})(RepoAddMemberAuditEntryVisibility || (RepoAddMemberAuditEntryVisibility = {}));
/** The privacy of a repository */
export var RepoArchivedAuditEntryVisibility;
(function (RepoArchivedAuditEntryVisibility) {
    /** The repository is visible only to users in the same business. */
    RepoArchivedAuditEntryVisibility["Internal"] = "INTERNAL";
    /** The repository is visible only to those with explicit access. */
    RepoArchivedAuditEntryVisibility["Private"] = "PRIVATE";
    /** The repository is visible to everyone. */
    RepoArchivedAuditEntryVisibility["Public"] = "PUBLIC";
})(RepoArchivedAuditEntryVisibility || (RepoArchivedAuditEntryVisibility = {}));
/** The merge options available for pull requests to this repository. */
export var RepoChangeMergeSettingAuditEntryMergeType;
(function (RepoChangeMergeSettingAuditEntryMergeType) {
    /** The pull request is added to the base branch in a merge commit. */
    RepoChangeMergeSettingAuditEntryMergeType["Merge"] = "MERGE";
    /** Commits from the pull request are added onto the base branch individually without a merge commit. */
    RepoChangeMergeSettingAuditEntryMergeType["Rebase"] = "REBASE";
    /** The pull request's commits are squashed into a single commit before they are merged to the base branch. */
    RepoChangeMergeSettingAuditEntryMergeType["Squash"] = "SQUASH";
})(RepoChangeMergeSettingAuditEntryMergeType || (RepoChangeMergeSettingAuditEntryMergeType = {}));
/** The privacy of a repository */
export var RepoCreateAuditEntryVisibility;
(function (RepoCreateAuditEntryVisibility) {
    /** The repository is visible only to users in the same business. */
    RepoCreateAuditEntryVisibility["Internal"] = "INTERNAL";
    /** The repository is visible only to those with explicit access. */
    RepoCreateAuditEntryVisibility["Private"] = "PRIVATE";
    /** The repository is visible to everyone. */
    RepoCreateAuditEntryVisibility["Public"] = "PUBLIC";
})(RepoCreateAuditEntryVisibility || (RepoCreateAuditEntryVisibility = {}));
/** The privacy of a repository */
export var RepoDestroyAuditEntryVisibility;
(function (RepoDestroyAuditEntryVisibility) {
    /** The repository is visible only to users in the same business. */
    RepoDestroyAuditEntryVisibility["Internal"] = "INTERNAL";
    /** The repository is visible only to those with explicit access. */
    RepoDestroyAuditEntryVisibility["Private"] = "PRIVATE";
    /** The repository is visible to everyone. */
    RepoDestroyAuditEntryVisibility["Public"] = "PUBLIC";
})(RepoDestroyAuditEntryVisibility || (RepoDestroyAuditEntryVisibility = {}));
/** The privacy of a repository */
export var RepoRemoveMemberAuditEntryVisibility;
(function (RepoRemoveMemberAuditEntryVisibility) {
    /** The repository is visible only to users in the same business. */
    RepoRemoveMemberAuditEntryVisibility["Internal"] = "INTERNAL";
    /** The repository is visible only to those with explicit access. */
    RepoRemoveMemberAuditEntryVisibility["Private"] = "PRIVATE";
    /** The repository is visible to everyone. */
    RepoRemoveMemberAuditEntryVisibility["Public"] = "PUBLIC";
})(RepoRemoveMemberAuditEntryVisibility || (RepoRemoveMemberAuditEntryVisibility = {}));
/** The reasons a piece of content can be reported or minimized. */
export var ReportedContentClassifiers;
(function (ReportedContentClassifiers) {
    /** An abusive or harassing piece of content */
    ReportedContentClassifiers["Abuse"] = "ABUSE";
    /** A duplicated piece of content */
    ReportedContentClassifiers["Duplicate"] = "DUPLICATE";
    /** An irrelevant piece of content */
    ReportedContentClassifiers["OffTopic"] = "OFF_TOPIC";
    /** An outdated piece of content */
    ReportedContentClassifiers["Outdated"] = "OUTDATED";
    /** The content has been resolved */
    ReportedContentClassifiers["Resolved"] = "RESOLVED";
    /** A spammy piece of content */
    ReportedContentClassifiers["Spam"] = "SPAM";
})(ReportedContentClassifiers || (ReportedContentClassifiers = {}));
/** The affiliation of a user to a repository */
export var RepositoryAffiliation;
(function (RepositoryAffiliation) {
    /** Repositories that the user has been added to as a collaborator. */
    RepositoryAffiliation["Collaborator"] = "COLLABORATOR";
    /**
     * Repositories that the user has access to through being a member of an
     * organization. This includes every repository on every team that the user is on.
     */
    RepositoryAffiliation["OrganizationMember"] = "ORGANIZATION_MEMBER";
    /** Repositories that are owned by the authenticated user. */
    RepositoryAffiliation["Owner"] = "OWNER";
})(RepositoryAffiliation || (RepositoryAffiliation = {}));
/** The reason a repository is listed as 'contributed'. */
export var RepositoryContributionType;
(function (RepositoryContributionType) {
    /** Created a commit */
    RepositoryContributionType["Commit"] = "COMMIT";
    /** Created an issue */
    RepositoryContributionType["Issue"] = "ISSUE";
    /** Created a pull request */
    RepositoryContributionType["PullRequest"] = "PULL_REQUEST";
    /** Reviewed a pull request */
    RepositoryContributionType["PullRequestReview"] = "PULL_REQUEST_REVIEW";
    /** Created the repository */
    RepositoryContributionType["Repository"] = "REPOSITORY";
})(RepositoryContributionType || (RepositoryContributionType = {}));
/** A repository interaction limit. */
export var RepositoryInteractionLimit;
(function (RepositoryInteractionLimit) {
    /** Users that are not collaborators will not be able to interact with the repository. */
    RepositoryInteractionLimit["CollaboratorsOnly"] = "COLLABORATORS_ONLY";
    /** Users that have not previously committed to a repository’s default branch will be unable to interact with the repository. */
    RepositoryInteractionLimit["ContributorsOnly"] = "CONTRIBUTORS_ONLY";
    /** Users that have recently created their account will be unable to interact with the repository. */
    RepositoryInteractionLimit["ExistingUsers"] = "EXISTING_USERS";
    /** No interaction limits are enabled. */
    RepositoryInteractionLimit["NoLimit"] = "NO_LIMIT";
})(RepositoryInteractionLimit || (RepositoryInteractionLimit = {}));
/** The length for a repository interaction limit to be enabled for. */
export var RepositoryInteractionLimitExpiry;
(function (RepositoryInteractionLimitExpiry) {
    /** The interaction limit will expire after 1 day. */
    RepositoryInteractionLimitExpiry["OneDay"] = "ONE_DAY";
    /** The interaction limit will expire after 1 month. */
    RepositoryInteractionLimitExpiry["OneMonth"] = "ONE_MONTH";
    /** The interaction limit will expire after 1 week. */
    RepositoryInteractionLimitExpiry["OneWeek"] = "ONE_WEEK";
    /** The interaction limit will expire after 6 months. */
    RepositoryInteractionLimitExpiry["SixMonths"] = "SIX_MONTHS";
    /** The interaction limit will expire after 3 days. */
    RepositoryInteractionLimitExpiry["ThreeDays"] = "THREE_DAYS";
})(RepositoryInteractionLimitExpiry || (RepositoryInteractionLimitExpiry = {}));
/** Indicates where an interaction limit is configured. */
export var RepositoryInteractionLimitOrigin;
(function (RepositoryInteractionLimitOrigin) {
    /** A limit that is configured at the organization level. */
    RepositoryInteractionLimitOrigin["Organization"] = "ORGANIZATION";
    /** A limit that is configured at the repository level. */
    RepositoryInteractionLimitOrigin["Repository"] = "REPOSITORY";
    /** A limit that is configured at the user-wide level. */
    RepositoryInteractionLimitOrigin["User"] = "USER";
})(RepositoryInteractionLimitOrigin || (RepositoryInteractionLimitOrigin = {}));
/** Properties by which repository invitation connections can be ordered. */
export var RepositoryInvitationOrderField;
(function (RepositoryInvitationOrderField) {
    /** Order repository invitations by creation time */
    RepositoryInvitationOrderField["CreatedAt"] = "CREATED_AT";
})(RepositoryInvitationOrderField || (RepositoryInvitationOrderField = {}));
/** The possible reasons a given repository could be in a locked state. */
export var RepositoryLockReason;
(function (RepositoryLockReason) {
    /** The repository is locked due to a billing related reason. */
    RepositoryLockReason["Billing"] = "BILLING";
    /** The repository is locked due to a migration. */
    RepositoryLockReason["Migrating"] = "MIGRATING";
    /** The repository is locked due to a move. */
    RepositoryLockReason["Moving"] = "MOVING";
    /** The repository is locked due to a rename. */
    RepositoryLockReason["Rename"] = "RENAME";
})(RepositoryLockReason || (RepositoryLockReason = {}));
/** Possible directions in which to order a list of repository migrations when provided an `orderBy` argument. */
export var RepositoryMigrationOrderDirection;
(function (RepositoryMigrationOrderDirection) {
    /** Specifies an ascending order for a given `orderBy` argument. */
    RepositoryMigrationOrderDirection["Asc"] = "ASC";
    /** Specifies a descending order for a given `orderBy` argument. */
    RepositoryMigrationOrderDirection["Desc"] = "DESC";
})(RepositoryMigrationOrderDirection || (RepositoryMigrationOrderDirection = {}));
/** Properties by which repository migrations can be ordered. */
export var RepositoryMigrationOrderField;
(function (RepositoryMigrationOrderField) {
    /** Order mannequins why when they were created. */
    RepositoryMigrationOrderField["CreatedAt"] = "CREATED_AT";
})(RepositoryMigrationOrderField || (RepositoryMigrationOrderField = {}));
/** Properties by which repository connections can be ordered. */
export var RepositoryOrderField;
(function (RepositoryOrderField) {
    /** Order repositories by creation time */
    RepositoryOrderField["CreatedAt"] = "CREATED_AT";
    /** Order repositories by name */
    RepositoryOrderField["Name"] = "NAME";
    /** Order repositories by push time */
    RepositoryOrderField["PushedAt"] = "PUSHED_AT";
    /** Order repositories by number of stargazers */
    RepositoryOrderField["Stargazers"] = "STARGAZERS";
    /** Order repositories by update time */
    RepositoryOrderField["UpdatedAt"] = "UPDATED_AT";
})(RepositoryOrderField || (RepositoryOrderField = {}));
/** The access level to a repository */
export var RepositoryPermission;
(function (RepositoryPermission) {
    /**
     * Can read, clone, and push to this repository. Can also manage issues, pull
     * requests, and repository settings, including adding collaborators
     */
    RepositoryPermission["Admin"] = "ADMIN";
    /** Can read, clone, and push to this repository. They can also manage issues, pull requests, and some repository settings */
    RepositoryPermission["Maintain"] = "MAINTAIN";
    /** Can read and clone this repository. Can also open and comment on issues and pull requests */
    RepositoryPermission["Read"] = "READ";
    /** Can read and clone this repository. Can also manage issues and pull requests */
    RepositoryPermission["Triage"] = "TRIAGE";
    /** Can read, clone, and push to this repository. Can also manage issues and pull requests */
    RepositoryPermission["Write"] = "WRITE";
})(RepositoryPermission || (RepositoryPermission = {}));
/** The privacy of a repository */
export var RepositoryPrivacy;
(function (RepositoryPrivacy) {
    /** Private */
    RepositoryPrivacy["Private"] = "PRIVATE";
    /** Public */
    RepositoryPrivacy["Public"] = "PUBLIC";
})(RepositoryPrivacy || (RepositoryPrivacy = {}));
/** The repository's visibility level. */
export var RepositoryVisibility;
(function (RepositoryVisibility) {
    /** The repository is visible only to users in the same business. */
    RepositoryVisibility["Internal"] = "INTERNAL";
    /** The repository is visible only to those with explicit access. */
    RepositoryVisibility["Private"] = "PRIVATE";
    /** The repository is visible to everyone. */
    RepositoryVisibility["Public"] = "PUBLIC";
})(RepositoryVisibility || (RepositoryVisibility = {}));
/** The possible scopes of an alert's dependency. */
export var RepositoryVulnerabilityAlertDependencyScope;
(function (RepositoryVulnerabilityAlertDependencyScope) {
    /** A dependency that is only used in development */
    RepositoryVulnerabilityAlertDependencyScope["Development"] = "DEVELOPMENT";
    /** A dependency that is leveraged during application runtime */
    RepositoryVulnerabilityAlertDependencyScope["Runtime"] = "RUNTIME";
})(RepositoryVulnerabilityAlertDependencyScope || (RepositoryVulnerabilityAlertDependencyScope = {}));
/** The possible states of an alert */
export var RepositoryVulnerabilityAlertState;
(function (RepositoryVulnerabilityAlertState) {
    /** An alert that has been manually closed by a user. */
    RepositoryVulnerabilityAlertState["Dismissed"] = "DISMISSED";
    /** An alert that has been resolved by a code change. */
    RepositoryVulnerabilityAlertState["Fixed"] = "FIXED";
    /** An alert that is still open. */
    RepositoryVulnerabilityAlertState["Open"] = "OPEN";
})(RepositoryVulnerabilityAlertState || (RepositoryVulnerabilityAlertState = {}));
/** The possible states that can be requested when creating a check run. */
export var RequestableCheckStatusState;
(function (RequestableCheckStatusState) {
    /** The check suite or run has been completed. */
    RequestableCheckStatusState["Completed"] = "COMPLETED";
    /** The check suite or run is in progress. */
    RequestableCheckStatusState["InProgress"] = "IN_PROGRESS";
    /** The check suite or run is in pending state. */
    RequestableCheckStatusState["Pending"] = "PENDING";
    /** The check suite or run has been queued. */
    RequestableCheckStatusState["Queued"] = "QUEUED";
    /** The check suite or run is in waiting state. */
    RequestableCheckStatusState["Waiting"] = "WAITING";
})(RequestableCheckStatusState || (RequestableCheckStatusState = {}));
/** Possible roles a user may have in relation to an organization. */
export var RoleInOrganization;
(function (RoleInOrganization) {
    /** A user who is a direct member of the organization. */
    RoleInOrganization["DirectMember"] = "DIRECT_MEMBER";
    /** A user with full administrative access to the organization. */
    RoleInOrganization["Owner"] = "OWNER";
    /** A user who is unaffiliated with the organization. */
    RoleInOrganization["Unaffiliated"] = "UNAFFILIATED";
})(RoleInOrganization || (RoleInOrganization = {}));
/** The possible digest algorithms used to sign SAML requests for an identity provider. */
export var SamlDigestAlgorithm;
(function (SamlDigestAlgorithm) {
    /** SHA1 */
    SamlDigestAlgorithm["Sha1"] = "SHA1";
    /** SHA256 */
    SamlDigestAlgorithm["Sha256"] = "SHA256";
    /** SHA384 */
    SamlDigestAlgorithm["Sha384"] = "SHA384";
    /** SHA512 */
    SamlDigestAlgorithm["Sha512"] = "SHA512";
})(SamlDigestAlgorithm || (SamlDigestAlgorithm = {}));
/** The possible signature algorithms used to sign SAML requests for a Identity Provider. */
export var SamlSignatureAlgorithm;
(function (SamlSignatureAlgorithm) {
    /** RSA-SHA1 */
    SamlSignatureAlgorithm["RsaSha1"] = "RSA_SHA1";
    /** RSA-SHA256 */
    SamlSignatureAlgorithm["RsaSha256"] = "RSA_SHA256";
    /** RSA-SHA384 */
    SamlSignatureAlgorithm["RsaSha384"] = "RSA_SHA384";
    /** RSA-SHA512 */
    SamlSignatureAlgorithm["RsaSha512"] = "RSA_SHA512";
})(SamlSignatureAlgorithm || (SamlSignatureAlgorithm = {}));
/** Properties by which saved reply connections can be ordered. */
export var SavedReplyOrderField;
(function (SavedReplyOrderField) {
    /** Order saved reply by when they were updated. */
    SavedReplyOrderField["UpdatedAt"] = "UPDATED_AT";
})(SavedReplyOrderField || (SavedReplyOrderField = {}));
/** Represents the individual results of a search. */
export var SearchType;
(function (SearchType) {
    /** Returns matching discussions in repositories. */
    SearchType["Discussion"] = "DISCUSSION";
    /** Returns results matching issues in repositories. */
    SearchType["Issue"] = "ISSUE";
    /** Returns results matching repositories. */
    SearchType["Repository"] = "REPOSITORY";
    /** Returns results matching users and organizations on GitHub. */
    SearchType["User"] = "USER";
})(SearchType || (SearchType = {}));
/** Classification of the advisory. */
export var SecurityAdvisoryClassification;
(function (SecurityAdvisoryClassification) {
    /** Classification of general advisories. */
    SecurityAdvisoryClassification["General"] = "GENERAL";
    /** Classification of malware advisories. */
    SecurityAdvisoryClassification["Malware"] = "MALWARE";
})(SecurityAdvisoryClassification || (SecurityAdvisoryClassification = {}));
/** The possible ecosystems of a security vulnerability's package. */
export var SecurityAdvisoryEcosystem;
(function (SecurityAdvisoryEcosystem) {
    /** GitHub Actions */
    SecurityAdvisoryEcosystem["Actions"] = "ACTIONS";
    /** PHP packages hosted at packagist.org */
    SecurityAdvisoryEcosystem["Composer"] = "COMPOSER";
    /** Erlang/Elixir packages hosted at hex.pm */
    SecurityAdvisoryEcosystem["Erlang"] = "ERLANG";
    /** Go modules */
    SecurityAdvisoryEcosystem["Go"] = "GO";
    /** Java artifacts hosted at the Maven central repository */
    SecurityAdvisoryEcosystem["Maven"] = "MAVEN";
    /** JavaScript packages hosted at npmjs.com */
    SecurityAdvisoryEcosystem["Npm"] = "NPM";
    /** .NET packages hosted at the NuGet Gallery */
    SecurityAdvisoryEcosystem["Nuget"] = "NUGET";
    /** Python packages hosted at PyPI.org */
    SecurityAdvisoryEcosystem["Pip"] = "PIP";
    /** Ruby gems hosted at RubyGems.org */
    SecurityAdvisoryEcosystem["Rubygems"] = "RUBYGEMS";
    /** Rust crates */
    SecurityAdvisoryEcosystem["Rust"] = "RUST";
})(SecurityAdvisoryEcosystem || (SecurityAdvisoryEcosystem = {}));
/** Identifier formats available for advisories. */
export var SecurityAdvisoryIdentifierType;
(function (SecurityAdvisoryIdentifierType) {
    /** Common Vulnerabilities and Exposures Identifier. */
    SecurityAdvisoryIdentifierType["Cve"] = "CVE";
    /** GitHub Security Advisory ID. */
    SecurityAdvisoryIdentifierType["Ghsa"] = "GHSA";
})(SecurityAdvisoryIdentifierType || (SecurityAdvisoryIdentifierType = {}));
/** Properties by which security advisory connections can be ordered. */
export var SecurityAdvisoryOrderField;
(function (SecurityAdvisoryOrderField) {
    /** Order advisories by publication time */
    SecurityAdvisoryOrderField["PublishedAt"] = "PUBLISHED_AT";
    /** Order advisories by update time */
    SecurityAdvisoryOrderField["UpdatedAt"] = "UPDATED_AT";
})(SecurityAdvisoryOrderField || (SecurityAdvisoryOrderField = {}));
/** Severity of the vulnerability. */
export var SecurityAdvisorySeverity;
(function (SecurityAdvisorySeverity) {
    /** Critical. */
    SecurityAdvisorySeverity["Critical"] = "CRITICAL";
    /** High. */
    SecurityAdvisorySeverity["High"] = "HIGH";
    /** Low. */
    SecurityAdvisorySeverity["Low"] = "LOW";
    /** Moderate. */
    SecurityAdvisorySeverity["Moderate"] = "MODERATE";
})(SecurityAdvisorySeverity || (SecurityAdvisorySeverity = {}));
/** Properties by which security vulnerability connections can be ordered. */
export var SecurityVulnerabilityOrderField;
(function (SecurityVulnerabilityOrderField) {
    /** Order vulnerability by update time */
    SecurityVulnerabilityOrderField["UpdatedAt"] = "UPDATED_AT";
})(SecurityVulnerabilityOrderField || (SecurityVulnerabilityOrderField = {}));
/** Properties by which sponsor connections can be ordered. */
export var SponsorOrderField;
(function (SponsorOrderField) {
    /** Order sponsorable entities by login (username). */
    SponsorOrderField["Login"] = "LOGIN";
    /** Order sponsors by their relevance to the viewer. */
    SponsorOrderField["Relevance"] = "RELEVANCE";
})(SponsorOrderField || (SponsorOrderField = {}));
/** Properties by which sponsorable connections can be ordered. */
export var SponsorableOrderField;
(function (SponsorableOrderField) {
    /** Order sponsorable entities by login (username). */
    SponsorableOrderField["Login"] = "LOGIN";
})(SponsorableOrderField || (SponsorableOrderField = {}));
/** The possible actions that GitHub Sponsors activities can represent. */
export var SponsorsActivityAction;
(function (SponsorsActivityAction) {
    /** The activity was cancelling a sponsorship. */
    SponsorsActivityAction["CancelledSponsorship"] = "CANCELLED_SPONSORSHIP";
    /** The activity was starting a sponsorship. */
    SponsorsActivityAction["NewSponsorship"] = "NEW_SPONSORSHIP";
    /** The activity was scheduling a downgrade or cancellation. */
    SponsorsActivityAction["PendingChange"] = "PENDING_CHANGE";
    /** The activity was funds being refunded to the sponsor or GitHub. */
    SponsorsActivityAction["Refund"] = "REFUND";
    /** The activity was disabling matching for a previously matched sponsorship. */
    SponsorsActivityAction["SponsorMatchDisabled"] = "SPONSOR_MATCH_DISABLED";
    /** The activity was changing the sponsorship tier, either directly by the sponsor or by a scheduled/pending change. */
    SponsorsActivityAction["TierChange"] = "TIER_CHANGE";
})(SponsorsActivityAction || (SponsorsActivityAction = {}));
/** Properties by which GitHub Sponsors activity connections can be ordered. */
export var SponsorsActivityOrderField;
(function (SponsorsActivityOrderField) {
    /** Order activities by when they happened. */
    SponsorsActivityOrderField["Timestamp"] = "TIMESTAMP";
})(SponsorsActivityOrderField || (SponsorsActivityOrderField = {}));
/** The possible time periods for which Sponsors activities can be requested. */
export var SponsorsActivityPeriod;
(function (SponsorsActivityPeriod) {
    /** Don't restrict the activity to any date range, include all activity. */
    SponsorsActivityPeriod["All"] = "ALL";
    /** The previous calendar day. */
    SponsorsActivityPeriod["Day"] = "DAY";
    /** The previous thirty days. */
    SponsorsActivityPeriod["Month"] = "MONTH";
    /** The previous seven days. */
    SponsorsActivityPeriod["Week"] = "WEEK";
})(SponsorsActivityPeriod || (SponsorsActivityPeriod = {}));
/** The different kinds of goals a GitHub Sponsors member can have. */
export var SponsorsGoalKind;
(function (SponsorsGoalKind) {
    /** The goal is about getting a certain amount in USD from sponsorships each month. */
    SponsorsGoalKind["MonthlySponsorshipAmount"] = "MONTHLY_SPONSORSHIP_AMOUNT";
    /** The goal is about reaching a certain number of sponsors. */
    SponsorsGoalKind["TotalSponsorsCount"] = "TOTAL_SPONSORS_COUNT";
})(SponsorsGoalKind || (SponsorsGoalKind = {}));
/** Properties by which Sponsors tiers connections can be ordered. */
export var SponsorsTierOrderField;
(function (SponsorsTierOrderField) {
    /** Order tiers by creation time. */
    SponsorsTierOrderField["CreatedAt"] = "CREATED_AT";
    /** Order tiers by their monthly price in cents */
    SponsorsTierOrderField["MonthlyPriceInCents"] = "MONTHLY_PRICE_IN_CENTS";
})(SponsorsTierOrderField || (SponsorsTierOrderField = {}));
/** Properties by which sponsorship update connections can be ordered. */
export var SponsorshipNewsletterOrderField;
(function (SponsorshipNewsletterOrderField) {
    /** Order sponsorship newsletters by when they were created. */
    SponsorshipNewsletterOrderField["CreatedAt"] = "CREATED_AT";
})(SponsorshipNewsletterOrderField || (SponsorshipNewsletterOrderField = {}));
/** Properties by which sponsorship connections can be ordered. */
export var SponsorshipOrderField;
(function (SponsorshipOrderField) {
    /** Order sponsorship by creation time. */
    SponsorshipOrderField["CreatedAt"] = "CREATED_AT";
})(SponsorshipOrderField || (SponsorshipOrderField = {}));
/** The privacy of a sponsorship */
export var SponsorshipPrivacy;
(function (SponsorshipPrivacy) {
    /** Private */
    SponsorshipPrivacy["Private"] = "PRIVATE";
    /** Public */
    SponsorshipPrivacy["Public"] = "PUBLIC";
})(SponsorshipPrivacy || (SponsorshipPrivacy = {}));
/** Properties by which star connections can be ordered. */
export var StarOrderField;
(function (StarOrderField) {
    /** Allows ordering a list of stars by when they were created. */
    StarOrderField["StarredAt"] = "STARRED_AT";
})(StarOrderField || (StarOrderField = {}));
/** The possible commit status states. */
export var StatusState;
(function (StatusState) {
    /** Status is errored. */
    StatusState["Error"] = "ERROR";
    /** Status is expected. */
    StatusState["Expected"] = "EXPECTED";
    /** Status is failing. */
    StatusState["Failure"] = "FAILURE";
    /** Status is pending. */
    StatusState["Pending"] = "PENDING";
    /** Status is successful. */
    StatusState["Success"] = "SUCCESS";
})(StatusState || (StatusState = {}));
/** The possible states of a subscription. */
export var SubscriptionState;
(function (SubscriptionState) {
    /** The User is never notified. */
    SubscriptionState["Ignored"] = "IGNORED";
    /** The User is notified of all conversations. */
    SubscriptionState["Subscribed"] = "SUBSCRIBED";
    /** The User is only notified when participating or @mentioned. */
    SubscriptionState["Unsubscribed"] = "UNSUBSCRIBED";
})(SubscriptionState || (SubscriptionState = {}));
/** Properties by which team discussion comment connections can be ordered. */
export var TeamDiscussionCommentOrderField;
(function (TeamDiscussionCommentOrderField) {
    /** Allows sequential ordering of team discussion comments (which is equivalent to chronological ordering). */
    TeamDiscussionCommentOrderField["Number"] = "NUMBER";
})(TeamDiscussionCommentOrderField || (TeamDiscussionCommentOrderField = {}));
/** Properties by which team discussion connections can be ordered. */
export var TeamDiscussionOrderField;
(function (TeamDiscussionOrderField) {
    /** Allows chronological ordering of team discussions. */
    TeamDiscussionOrderField["CreatedAt"] = "CREATED_AT";
})(TeamDiscussionOrderField || (TeamDiscussionOrderField = {}));
/** Properties by which team member connections can be ordered. */
export var TeamMemberOrderField;
(function (TeamMemberOrderField) {
    /** Order team members by creation time */
    TeamMemberOrderField["CreatedAt"] = "CREATED_AT";
    /** Order team members by login */
    TeamMemberOrderField["Login"] = "LOGIN";
})(TeamMemberOrderField || (TeamMemberOrderField = {}));
/** The possible team member roles; either 'maintainer' or 'member'. */
export var TeamMemberRole;
(function (TeamMemberRole) {
    /** A team maintainer has permission to add and remove team members. */
    TeamMemberRole["Maintainer"] = "MAINTAINER";
    /** A team member has no administrative permissions on the team. */
    TeamMemberRole["Member"] = "MEMBER";
})(TeamMemberRole || (TeamMemberRole = {}));
/** Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL. */
export var TeamMembershipType;
(function (TeamMembershipType) {
    /** Includes immediate and child team members for the team. */
    TeamMembershipType["All"] = "ALL";
    /** Includes only child team members for the team. */
    TeamMembershipType["ChildTeam"] = "CHILD_TEAM";
    /** Includes only immediate members of the team. */
    TeamMembershipType["Immediate"] = "IMMEDIATE";
})(TeamMembershipType || (TeamMembershipType = {}));
/** Properties by which team connections can be ordered. */
export var TeamOrderField;
(function (TeamOrderField) {
    /** Allows ordering a list of teams by name. */
    TeamOrderField["Name"] = "NAME";
})(TeamOrderField || (TeamOrderField = {}));
/** The possible team privacy values. */
export var TeamPrivacy;
(function (TeamPrivacy) {
    /** A secret team can only be seen by its members. */
    TeamPrivacy["Secret"] = "SECRET";
    /** A visible team can be seen and @mentioned by every member of the organization. */
    TeamPrivacy["Visible"] = "VISIBLE";
})(TeamPrivacy || (TeamPrivacy = {}));
/** Properties by which team repository connections can be ordered. */
export var TeamRepositoryOrderField;
(function (TeamRepositoryOrderField) {
    /** Order repositories by creation time */
    TeamRepositoryOrderField["CreatedAt"] = "CREATED_AT";
    /** Order repositories by name */
    TeamRepositoryOrderField["Name"] = "NAME";
    /** Order repositories by permission */
    TeamRepositoryOrderField["Permission"] = "PERMISSION";
    /** Order repositories by push time */
    TeamRepositoryOrderField["PushedAt"] = "PUSHED_AT";
    /** Order repositories by number of stargazers */
    TeamRepositoryOrderField["Stargazers"] = "STARGAZERS";
    /** Order repositories by update time */
    TeamRepositoryOrderField["UpdatedAt"] = "UPDATED_AT";
})(TeamRepositoryOrderField || (TeamRepositoryOrderField = {}));
/** The possible team review assignment algorithms */
export var TeamReviewAssignmentAlgorithm;
(function (TeamReviewAssignmentAlgorithm) {
    /** Balance review load across the entire team */
    TeamReviewAssignmentAlgorithm["LoadBalance"] = "LOAD_BALANCE";
    /** Alternate reviews between each team member */
    TeamReviewAssignmentAlgorithm["RoundRobin"] = "ROUND_ROBIN";
})(TeamReviewAssignmentAlgorithm || (TeamReviewAssignmentAlgorithm = {}));
/** The role of a user on a team. */
export var TeamRole;
(function (TeamRole) {
    /** User has admin rights on the team. */
    TeamRole["Admin"] = "ADMIN";
    /** User is a member of the team. */
    TeamRole["Member"] = "MEMBER";
})(TeamRole || (TeamRole = {}));
/** Reason that the suggested topic is declined. */
export var TopicSuggestionDeclineReason;
(function (TopicSuggestionDeclineReason) {
    /** The suggested topic is not relevant to the repository. */
    TopicSuggestionDeclineReason["NotRelevant"] = "NOT_RELEVANT";
    /** The viewer does not like the suggested topic. */
    TopicSuggestionDeclineReason["PersonalPreference"] = "PERSONAL_PREFERENCE";
    /** The suggested topic is too general for the repository. */
    TopicSuggestionDeclineReason["TooGeneral"] = "TOO_GENERAL";
    /** The suggested topic is too specific for the repository (e.g. #ruby-on-rails-version-4-2-1). */
    TopicSuggestionDeclineReason["TooSpecific"] = "TOO_SPECIFIC";
})(TopicSuggestionDeclineReason || (TopicSuggestionDeclineReason = {}));
/** The possible states of a tracked issue. */
export var TrackedIssueStates;
(function (TrackedIssueStates) {
    /** The tracked issue is closed */
    TrackedIssueStates["Closed"] = "CLOSED";
    /** The tracked issue is open */
    TrackedIssueStates["Open"] = "OPEN";
})(TrackedIssueStates || (TrackedIssueStates = {}));
/** The possible durations that a user can be blocked for. */
export var UserBlockDuration;
(function (UserBlockDuration) {
    /** The user was blocked for 1 day */
    UserBlockDuration["OneDay"] = "ONE_DAY";
    /** The user was blocked for 30 days */
    UserBlockDuration["OneMonth"] = "ONE_MONTH";
    /** The user was blocked for 7 days */
    UserBlockDuration["OneWeek"] = "ONE_WEEK";
    /** The user was blocked permanently */
    UserBlockDuration["Permanent"] = "PERMANENT";
    /** The user was blocked for 3 days */
    UserBlockDuration["ThreeDays"] = "THREE_DAYS";
})(UserBlockDuration || (UserBlockDuration = {}));
/** Properties by which user status connections can be ordered. */
export var UserStatusOrderField;
(function (UserStatusOrderField) {
    /** Order user statuses by when they were updated. */
    UserStatusOrderField["UpdatedAt"] = "UPDATED_AT";
})(UserStatusOrderField || (UserStatusOrderField = {}));
/** Properties by which verifiable domain connections can be ordered. */
export var VerifiableDomainOrderField;
(function (VerifiableDomainOrderField) {
    /** Order verifiable domains by their creation date. */
    VerifiableDomainOrderField["CreatedAt"] = "CREATED_AT";
    /** Order verifiable domains by the domain name. */
    VerifiableDomainOrderField["Domain"] = "DOMAIN";
})(VerifiableDomainOrderField || (VerifiableDomainOrderField = {}));
