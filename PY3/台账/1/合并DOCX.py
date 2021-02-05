from docx import Document
from docxcompose.composer import Composer
import  os
from docx import Document as Document_compose
result=[]
def search(path=".", name=""):
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        if os.path.isdir(item_path):
            search(item_path, name)
        elif os.path.isfile(item_path):
            if name in item:
                global result
                result.append(item_path)
                # print (item_path)

search(path=r"D:\MYPROJECT\PY3\台账\1", name=".docx")
result.sort(key= lambda x:int(x[26:-5]))
print(result)
# print(result[10][26:-5])

files = result
def combine_all_docx(filename_master,files_list):
    number_of_sections=len(files_list)
    master = Document_compose(filename_master)
    composer = Composer(master)
    for i in range(1, number_of_sections):
        print(i)
        doc_temp = Document_compose(files_list[i])
        composer.append(doc_temp)
    composer.save("combined_file.docx")
combine_all_docx(result[0],result)