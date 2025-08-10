const workflowUrl = "https://api.coze.cn/v1/workflow/run";
const workflow_id = "7536880825594675235";

const patToken = import.meta.env.VITE_PAT_TOKEN;

export const generateAvatar = async () => {
  // 调用 coze 工作流
  const res = await fetch(workflowUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${patToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workflow_id }),
  });
  const ret = await res.json();
  console.log("//////////////////////", ret);

  const data = JSON.parse(ret.data);
  return data.data;
};
