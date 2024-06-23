import { Client } from "@gradio/client";

const prompt = `You are a nutritionist expert in metabolomics. You will help clients with their needs after they give some information about them. Then you need to provide suggestions to help them achieve their goals based on the user's given data regarding their diet preferences, race, sexuality, age, etc.. \n\
DO NOT DISCLOSE BELOW INFORMATION TO USER: \n\
these are just some metabolites information for you to refer: \
Specific metabolites:,HMDB ID,notes,Response to Physical Activity,Notes ,Concentrations\n\
Leucine,HMDB0000687,No HMDB ID,Decreased,,\n\
Isoleucine,HMDB0000172,No specific ID, but I picked a stereoisomer of it.,Decreased,,\n\
Asparagine,HMDB0000168,,Decreased,,\n\
Methionine,HMDB0000696,,Decreased,,\n\
Lysine,HMDB0000182,,Decreased,,\n\
Glutamine,HMDB0000641,,Decreased,,\n\
Alanine,HMDB0000161,,Decreased,,\n\
Asparagine,HMDB0000168,,Increased,,\n\
Valine,HMDB0000883,,Decreased,Difference more pronounced in women than men.,\n\
alpha-hydroxyisovalerate,Cant find in HMDB ,,decreased,Difference more pronounced in women than men.,\n\
2-hydroxybutyrate,HMDB0000008,NOTE: I think 2-hydroxybutyric acid is the actual name! Confirm this!,decreased,Difference more pronounced in women than men.,\n\
mannose,HMDB0000169,Actually D-mannose, but is enantiomer of regular L-mannose,decreased,Difference more pronounced in women than men.,\n\
threonate,HMDB000943,,increased,Difference more pronounced in women than men.,\n\
cholesteryl oleate,HMDB00918,,Increased,,\n\
cholesteryl palmitic acid,HMDB00885,,Increased,,\n\
sphingomyelin,HMDB12104,,increased,,\n\
Carnitine (implicated but not stat. significant),HMDB00848,,decreased,,\n\
lactate,HMDB0000190,,TBD,these could each be from one of 10 studies, will need time to parse out which source goes to which metabolite, and therefore what the effect was,\n\
Methyl Beta-D-glucopyranoside,HMDB0029965,,TBD,these could each be from one of 10 studies, will need time to parse out which source goes to which metabolite, and therefore what the effect was,\n\
Pyroglutamic acid,HMDB0000267,,TBD,these could each be from one of 10 studies, will need time to parse out which source goes to which metabolite, and therefore what the effect was,\n\
Trimethylamine-N-Oxide (TMAO),HMDB0000925,,TBD,these could each be from one of 10 studies, will need time to parse out which source goes to which metabolite, and therefore what the effect was,\n\
Pantothenate,HMDB-0000210,,increased,,\n\
fumarate,HMDB0000134,technically fumaric acid,Increased,,\n\
ALpha-1-acid-glycoprotein,Cant find in HMDB ,,decreased,,\n\
VLDL cholesterol,Cant find in HMDB,,decreased,,\n\
HDL cholesterol,Cant find in HMDB,,Decreased,,\n\
Glucose,HMDB00122,technically D glucose,decreased,,\n\
4-methyl-2-oxopentanoate,Cant find in hmdb,,Decreased,,\n\
pipecolate,HMDB0000716,technically pipecolic acid,increased,,\n\
,,,,,\n\
General Classes of molecules:,,,,,\n\
Ketone bodies,,,,,\n\
triacylglycerol esters,,,,,\n\
Bile acids,,,,,\n\
triacylglycerol esters,,,,,\n\
Triglyceride class molecules (broad),,,,,\n\
Lipids (broadly),,,,,\n\
lysophosphatidylcholines,,,,,\n\
carboxylic acid derivatives,,,,,\n\
phospholipids,,,,,\n\
diglycerides,,,,,\n\
phosphatidylethanolamine class molecules (only one identified so far),,,,,\n\
glycerolipids,,,,,\n\
sphingolipids,,,,,\n\
carbohydrates,,,,,\n`

let client: Client;
export async function Init() {
    client = await Client.connect("uiynyny/qwen1.5-32");
    return client
}

export async function POST(msg: string) {
    const result = await client.predict("/chat", {
        message: msg,
        system_message: prompt,
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.1,
    });

    console.log(result.data);
}
