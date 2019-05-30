<template>
  <div class="list">
    <mu-table :fixedHeader="true" :showCheckbox="false">
      <mu-thead>
        <mu-tr>
          <mu-th>电影海报</mu-th>
          <mu-th>电影名称</mu-th>
          <mu-th>简介</mu-th>
          <mu-th>评分</mu-th>
          <mu-th>操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(movie, index) in movies" :key="index">
          <mu-td>
            <img class="movie-poster" :src="movie.poster">
          </mu-td>
          <mu-td>
            <h3>{{movie.title}}</h3>
          </mu-td>
          <mu-td>
            <p class="movie-introduction">{{movie.introduction}}</p>
          </mu-td>
          <mu-td class="movie-rating">{{movie.rating}}</mu-td>
          <mu-td>
            <mu-raised-button @click="showDetail(movie.title)" label="详情" primary/>
            <mu-raised-button @click="openEditMovieModal(movie)" label="修改" primary/>
            <mu-raised-button @click="removeMovie(movie)" label="删除" secondary/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <!-- 添加电影按钮 -->
    <mu-float-button
      icon="add"
      class="add-movie-button"
      backgroundColor
      @click="openAddMovieModal"
    />
    <!-- 添加电影表单 -->
    <vodal
      :show="addMovieModal"
      animation="slideDown"
      :width="500"
      :height="480"
      :closeButton="false"
    >
      <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/>
      <br>
      <mu-text-field v-model="poster" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/>
      <br>
      <mu-text-field
        v-model="introduction"
        multiLine
        :rows="2"
        :rowsMax="6"
        fullWidth
        icon="description"
        label="简介"
        labelFloat
      />
      <br>
      <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/>
      <br>
      <mu-raised-button @click="closeModal" label="取消" icon="undo"/>
      <mu-raised-button @click="addMovie" label="确定" icon="check" primary/>
    </vodal>
    <!-- 编辑电影表单 -->
    <vodal
      :show="editMovieModal"
      animation="slideDown"
      :width="500"
      :height="480"
      :closeButton="false"
    >
      <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/>
      <br>
      <mu-text-field v-model="poster" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/>
      <br>
      <mu-text-field
        v-model="introduction"
        multiLine
        :rows="2"
        :rowsMax="6"
        fullWidth
        icon="description"
        label="简介"
        labelFloat
      />
      <br>
      <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/>
      <br>
      <mu-raised-button @click="closeModal" label="取消" icon="undo"/>
      <mu-raised-button @click="editMovie" label="确定" icon="check" primary/>
    </vodal>
  </div>
</template>

<script>
export default {
  created() {
    this.getMovies();
    document.title = this.$router.name;
  },
  data() {
    return {
      title: "",
      poster: "",
      rating: null,
      introduction: "",
      movie_id: "",
      movies: [],
      addMovieModal: false,
      editMovieModal: false
    };
  },
  components: {},
  methods: {
    getMovies() {
      this.$axios
        .get("/api/movie")
        .then(res => {
          this.movies = res.data;
        })
        .catch(err => {
          this.toastr.error(`${err.message}`, "ERROR");
        });
    },
    // 打开添加电影modal的方法
    openAddMovieModal() {
      this.addMovieModal = true;
    },
    closeModal() {
      this.addMovieModal = false;
      this.editMovieModal = false;
      this.title = "";
      this.poster = "";
      this.rating = null;
      this.introduction = "";
      this.movie_id = "";
    },
    addMovie() {
      this.$axios
        .post("api/movie", {
          title: this.title,
          poster: this.poster,
          introduction: this.introduction,
          rating: this.rating
        })
        .then(() => {
          this.toastr.success("添加电影成功");
          this.addMovieModal = false;
          this.title = "";
          this.poster = "";
          this.rating = null;
          this.introduction = "";
          this.movie_id = "";
          this.getMovies();
        })
        .catch(() => {
          this.toastr.error("保存失败");
        });
    },
    showDetail(title) {
      this.$router.push(`/movie/${title}`)
    },
    openEditMovieModal(movie) {
      this.editMovieModal = true;
      this.title = movie.title;
      this.rating = movie.rating;
      this.introduction = movie.introduction;
      this.poster = movie.poster;
      this.movie_id = movie._id;
    },
    removeMovie(movie) {
      let id = movie._id;
      this.$axios.delete(`/api/movie/${id}`)
      .then(() => {
        this.toastr.success("删除成功");
        this.getMovies();
      })
      
    },
    editMovie() {
      let id = this.movie_id
      this.$axios.put(`/api/movie/${id}`, {
        title: this.title,
        poster: this.poster,
        introduction: this.introduction,
        rating: this.rating
      })
      .then( () => {
        this.toastr.success('更新电影成功')
        this.closeModal()
        this.getMovies()
        this.title = ''
        this.rating = null
        this.introduction = ''
        this.poster = ''
        this.movie_id = ''
      })
    }
  }
};
</script>


<style lang="css" scoped>
.mu-th {
  text-align: center !important;
}
.mu-td {
  text-align: center !important;
}
.movie-poster {
  width: 80px;
  padding: 4px 0;
}
.movie-introduction {
  white-space: normal;
  padding: 4px 4px;
  letter-spacing: 1px;
  font-size: 14px;
  text-align: left;
  text-indent: 2em;
}
</style>