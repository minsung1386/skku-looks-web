import os
import sys
import torch
from PIL import Image
from tqdm import tqdm
from oml.const import CKPT_SAVE_ROOT as CKPT_DIR, MOCK_DATASET_PATH as DATA_DIR
from oml.models import ViTExtractor
from oml.registry.transforms import get_transforms_for_pretrained
from oml.inference.flat import inference_on_images
from oml.utils.misc_torch import pairwise_dist


# 커맨드 라인에서 이미지 파일 경로를 인자로 받음
input_image_path = sys.argv[1]

# 모델 초기화
model = ViTExtractor.from_pretrained("vits16_inshop")
transform, im_reader = get_transforms_for_pretrained("vits16_inshop")
args = {"num_workers": 0, "batch_size": 8}

# db에 저장된 이미지
db_image_path = "./image/"
galleries = [os.path.join(db_image_path, filename) for filename in os.listdir(db_image_path) if filename.endswith(('.jpg', '.jpeg', '.png'))]

queries = [input_image_path]

features_queries = inference_on_images(model, paths=queries, transform=transform, **args)
features_galleries = inference_on_images(model, paths=galleries, transform=transform, **args)

dist_mat = pairwise_dist(x1=features_queries, x2=features_galleries)
ii_closest = torch.argmin(dist_mat, dim=1)

closest_img_path = galleries[ii_closest[0].item()]
print(closest_img_path)