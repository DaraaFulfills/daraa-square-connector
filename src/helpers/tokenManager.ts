const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

// This file includes helpers to fetch square auth tokens
// Currently this functionality uses Google secret manager
// TODO: Replace secret manager calls with database calls

const parent = "projects/70588820651/secrets/Square-Token";

// Returns first valid token name
export async function getFirstTokenName() {
    const client = new SecretManagerServiceClient();
    const [versions] = await client.listSecretVersions({
      parent: parent,
    });
    console.log("Getting Token Name");
  
    const first_name = versions.find((version) => version.state !== "DISABLED");
    const valid_version = first_name? first_name : versions[0];
  
    // console.log(versions);
    // console.log(versions[0].version);
    console.log(await getToken(valid_version.name));
    return valid_version.name;
  }
  
  //TODO: Refactor getToken and disableToken to not be copy pasted
  export const getToken = async (versionName: string) => {
    try {
      const client = new SecretManagerServiceClient();
      const name = versionName;
      const [version] = await client.accessSecretVersion({ name });
      console.log("Getting Token");
      const payload = version.payload.data.toString("utf8");
      console.log("Secret payload:", payload);
      return payload;
    } catch (error) {
      console.error("get secret", error);
    }
  };
  
  export const disableToken = async (versionName: string) => {
    try {
      const client = new SecretManagerServiceClient();
      const name = versionName;
      const [version] = await client.disableSecretVersion({ name });
  
      console.log("Secret successfully disabled:", version.name);
      return version.name;
    } catch (error) {
      console.error("disable secret", error);
    }
  };